import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  ArrowRight,
  Sparkles,
  Scale,
  Droplets,
  Utensils,
  TrendingUp,
  Bot,
  CheckCircle2,
  Lock,
  LayoutDashboard,
  Send,
  Flame,
  Zap,
  Shield,
  HeartPulse,
  ChevronRight,
  Award,
  Sliders,
  Check,
  BarChart3,
  RefreshCw,
  Dumbbell,
  Timer,
  Calendar,
  Layers,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Instant demo loading state
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Accent theme switcher: 'emerald' | 'cyan' | 'violet'
  const [accentTheme, setAccentTheme] = useState('emerald');

  // Interactive Live Dashboard Preview state
  const [activePreviewTab, setActivePreviewTab] = useState('overview');
  const [simWater, setSimWater] = useState(1800); // ml out of 2400
  const maxWater = 2400;

  // Interactive Calculator State
  const [calcWeight, setCalcWeight] = useState(70); // kg
  const [calcHeight, setCalcHeight] = useState(175); // cm
  const [calcGender, setCalcGender] = useState('male'); // male | female
  const [calcActivity, setCalcActivity] = useState(1.55); // 1.2, 1.375, 1.55, 1.725
  const [calcGoal, setCalcGoal] = useState('maintain'); // lose | maintain | gain

  // 30-Day Transformation Time Machine State
  const [simDay, setSimDay] = useState(15);

  // Smart Blueprint Generator State
  const [genFocus, setGenFocus] = useState('shred'); // 'shred' | 'muscle' | 'endurance' | 'mobility'
  const [genTime, setGenTime] = useState('45'); // '25' | '45' | '65'
  const [genDiet, setGenDiet] = useState('protein'); // 'protein' | 'plant' | 'keto'

  // Interactive Goal Selector State
  const [selectedGoal, setSelectedGoal] = useState('fatloss');

  // Interactive AI Assistant Playground State
  const [activeQuestion, setActiveQuestion] = useState('What should I eat post-workout for optimal recovery?');
  const [aiCustomInput, setAiCustomInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState(
    'For optimal muscle repair and glycogen replenishment, aim for a 3:1 or 2:1 carbohydrate-to-protein meal within 45 minutes of training. Great examples: grilled chicken with quinoa and steamed greens, or a whey protein smoothie with banana and oats (~30g protein, 45g carbs).'
  );

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState(null);

  // Dynamic Theme Colors
  const themeClasses = useMemo(() => {
    switch (accentTheme) {
      case 'cyan':
        return {
          primaryGradient: 'from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300',
          accentText: 'text-cyan-400',
          accentBorder: 'border-cyan-500/30',
          accentBg: 'bg-cyan-500/10',
          glowClass: 'glow-teal',
          lightGlow: 'bg-cyan-500/10',
          badgeText: 'text-cyan-300',
          buttonText: 'text-slate-950',
          accentHex: '#06b6d4'
        };
      case 'violet':
        return {
          primaryGradient: 'from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400',
          accentText: 'text-violet-400',
          accentBorder: 'border-violet-500/30',
          accentBg: 'bg-violet-500/10',
          glowClass: 'shadow-[0_0_35px_-5px_rgba(139,92,246,0.25)]',
          lightGlow: 'bg-violet-500/10',
          badgeText: 'text-violet-300',
          buttonText: 'text-white',
          accentHex: '#8b5cf6'
        };
      case 'emerald':
      default:
        return {
          primaryGradient: 'from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400',
          accentText: 'text-emerald-400',
          accentBorder: 'border-emerald-500/30',
          accentBg: 'bg-emerald-500/10',
          glowClass: 'glow-emerald',
          lightGlow: 'bg-emerald-500/10',
          badgeText: 'text-emerald-300',
          buttonText: 'text-slate-950',
          accentHex: '#10b981'
        };
    }
  }, [accentTheme]);

  // Pre-configured AI responses
  const aiKnowledgeBase = {
    'What should I eat post-workout for optimal recovery?':
      'For optimal muscle repair and glycogen replenishment, aim for a 3:1 or 2:1 carbohydrate-to-protein meal within 45 minutes of training. Great examples: grilled chicken with quinoa and steamed greens, or a whey protein smoothie with banana and oats (~30g protein, 45g carbs).',
    'How does hydration impact fat oxidation and energy?':
      'Even mild dehydration of 1.5-2% impairs metabolic efficiency and cellular mitochondrial function by up to 15%. Drinking 500ml of cold water temporarily increases resting metabolic rate by 24-30% for about 60 minutes via thermogenesis.',
    'Analyze a 500 kcal daily deficit over 60 days':
      'A consistent 500 kcal/day deficit creates a 30,000 kcal cumulative deficit over 60 days. Because 1 kg of body fat contains ~7,700 kcal, this projects to approximately 3.9 to 4.3 kg of steady, sustainable fat loss with minimal lean muscle loss when protein is kept above 1.8g/kg.',
    'Suggest a high-protein vegetarian meal plan':
      'Daily Target ~130g Protein: Breakfast: Greek yogurt or tofu scramble with pumpkin seeds (32g). Lunch: Lentil & chickpea Mediterranean salad with edamame and feta (38g). Snack: Cottage cheese with almonds (22g). Dinner: Tempeh stir-fry with quinoa and broccoli (40g).'
  };

  // Calculator computations
  const calculatedMetrics = useMemo(() => {
    const heightM = calcHeight / 100;
    const bmi = parseFloat((calcWeight / (heightM * heightM)).toFixed(1));

    let bmiCategory = 'Normal weight';
    let bmiColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    } else if (bmi >= 25 && bmi < 29.9) {
      bmiCategory = 'Overweight';
      bmiColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    } else if (bmi >= 30) {
      bmiCategory = 'High range';
      bmiColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }

    let bmr = 0;
    if (calcGender === 'male') {
      bmr = Math.round(10 * calcWeight + 6.25 * calcHeight - 5 * 28 + 5);
    } else {
      bmr = Math.round(10 * calcWeight + 6.25 * calcHeight - 5 * 28 - 161);
    }

    const tdee = Math.round(bmr * calcActivity);
    let targetCalories = tdee;
    if (calcGoal === 'lose') targetCalories = tdee - 450;
    if (calcGoal === 'gain') targetCalories = tdee + 350;

    const proteinGrams = Math.round(calcWeight * 2.0);
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    const carbGrams = Math.max(50, Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4));

    return {
      bmi,
      bmiCategory,
      bmiColor,
      bmr,
      tdee,
      targetCalories,
      macros: {
        protein: proteinGrams,
        carbs: carbGrams,
        fats: fatGrams
      }
    };
  }, [calcWeight, calcHeight, calcGender, calcActivity, calcGoal]);

  // 30-Day Simulated Telemetry calculations
  const simMetrics = useMemo(() => {
    const fraction = simDay / 30;
    const startWeight = 78.0;
    const endWeight = 72.8;
    const curWeight = (startWeight - fraction * (startWeight - endWeight)).toFixed(1);

    const startFat = 25.2;
    const endFat = 18.5;
    const curFat = (startFat - fraction * (startFat - endFat)).toFixed(1);

    const startRHR = 76;
    const endRHR = 61;
    const curRHR = Math.round(startRHR - fraction * (startRHR - endRHR));

    const curWaterPct = Math.round(40 + fraction * 58);
    const curConsistency = Math.round(25 + fraction * 73);

    return {
      weight: curWeight,
      bodyFat: curFat,
      rhr: curRHR,
      waterPct: curWaterPct,
      consistency: curConsistency
    };
  }, [simDay]);

  // Dynamic Blueprint Output
  const blueprintOutput = useMemo(() => {
    const blueprints = {
      shred: {
        routine: 'High-Density Interval Circuit & Cardio Finish',
        duration: `${genTime} min`,
        exercises: ['Kettlebell Swings (4x15)', 'Dumbbell Thrusters (4x12)', 'Incline Treadmill Walk (15 min)'],
        meals: {
          breakfast: 'Egg white & spinach scramble with avocado toast (340 kcal, 32g P)',
          lunch: 'Lemon herb grilled chicken salad with quinoa (510 kcal, 44g P)',
          snack: 'Greek yogurt with mixed berries & chia seeds (190 kcal, 20g P)',
          dinner: 'Pan-seared cod with asparagus and roasted sweet potato (420 kcal, 38g P)'
        },
        totals: '1,460 kcal · 134g Protein · 110g Carbs · 42g Fats'
      },
      muscle: {
        routine: 'Hypertrophy Strength & Progressive Overload',
        duration: `${genTime} min`,
        exercises: ['Barbell Squats (4x8)', 'Overhead Dumbbell Press (4x10)', 'Cable Rows (4x12)'],
        meals: {
          breakfast: 'Rolled oats with whey protein, almond butter & banana (520 kcal, 38g P)',
          lunch: 'Grass-fed lean beef grain bowl with roasted peppers (680 kcal, 52g P)',
          snack: 'Protein shake with rice cakes and honey (280 kcal, 26g P)',
          dinner: 'Baked salmon with jasmine rice and broccoli (610 kcal, 46g P)'
        },
        totals: '2,090 kcal · 162g Protein · 210g Carbs · 62g Fats'
      },
      endurance: {
        routine: 'Zone 2 Aerobic Conditioning & Threshold Tempo',
        duration: `${genTime} min`,
        exercises: ['Zone 2 Steady State Ergometer (25 min)', 'Bodyweight Lunge Matrix (3x20)', 'Core Plank Flow (3x60s)'],
        meals: {
          breakfast: 'Whole grain toast with poached eggs and sliced orange (410 kcal, 24g P)',
          lunch: 'Brown rice bowl with black beans, chicken & salsa (590 kcal, 40g P)',
          snack: 'Trail mix & coconut water hydration pouch (240 kcal, 10g P)',
          dinner: 'Grilled turkey breast with sweet potato and zucchini (520 kcal, 42g P)'
        },
        totals: '1,760 kcal · 116g Protein · 225g Carbs · 45g Fats'
      },
      mobility: {
        routine: 'Dynamic Movement, Hip Mobility & Core Stability',
        duration: `${genTime} min`,
        exercises: ['World Greatest Stretch Flow (8 reps)', 'Cat-Cow to Bird Dog (3x12)', 'Deadbugs & Hollow Hold (3x45s)'],
        meals: {
          breakfast: 'Green smoothie with spinach, pea protein & pineapple (320 kcal, 28g P)',
          lunch: 'Mediterranean chickpea & roasted vegetable bowl (480 kcal, 22g P)',
          snack: 'Walnuts and dark chocolate square (180 kcal, 6g P)',
          dinner: 'Tofu stir fry with edamame and brown rice (460 kcal, 32g P)'
        },
        totals: '1,440 kcal · 88g Protein · 165g Carbs · 48g Fats'
      }
    };
    return blueprints[genFocus];
  }, [genFocus, genTime, genDiet]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2600);
  };

  // Handle Instant One-Click Demo
  const handleInstantDemo = async () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }
    try {
      setDemoLoading(true);
      setDemoError('');
      await login('demo@fittrack.com', 'password123');
      navigate('/dashboard');
    } catch (err) {
      console.error('Instant Demo login error:', err);
      setDemoError('Connecting to demo account... Navigating to login.');
      setTimeout(() => navigate('/login'), 1200);
    } finally {
      setDemoLoading(false);
    }
  };

  const handleSimWaterAdd = (amount) => {
    setSimWater((prev) => {
      const next = Math.min(maxWater, prev + amount);
      showToast(`💧 Added +${amount}ml! Current: ${(next / 1000).toFixed(2)}L`);
      return next;
    });
  };

  const handlePromptSelect = (prompt) => {
    setActiveQuestion(prompt);
    setAiTyping(true);
    setTimeout(() => {
      setAiResponse(aiKnowledgeBase[prompt] || 'FitTrack AI is ready to analyze your personal health telemetry.');
      setAiTyping(false);
    }, 280);
  };

  const handleCustomAiSubmit = (e) => {
    e.preventDefault();
    if (!aiCustomInput.trim()) return;
    const query = aiCustomInput.trim();
    setActiveQuestion(query);
    setAiCustomInput('');
    setAiTyping(true);
    setTimeout(() => {
      setAiResponse(
        `Biometric analysis for "${query}": Maintain steady protein intake (approx 2.0g/kg body weight) and ensure hydration remains above 2.4L daily for optimal cellular recovery and metabolic momentum.`
      );
      setAiTyping(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-inter selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      {/* Dynamic ambient background glows */}
      <div
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none -z-10 transition-colors duration-700"
        style={{
          backgroundColor: accentTheme === 'emerald' ? 'rgba(16,185,129,0.12)' : accentTheme === 'cyan' ? 'rgba(6,182,212,0.12)' : 'rgba(139,92,246,0.12)'
        }}
      />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ===== ULTRA-MODERN STICKY NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${themeClasses.primaryGradient} flex items-center justify-center text-slate-950 shadow-lg group-hover:scale-105 transition-transform font-bold`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sora font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                FITTRACK <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${themeClasses.accentBg} ${themeClasses.accentText} border ${themeClasses.accentBorder}`}>3.0</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                Precision Telemetry
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#overview" className={`hover:${themeClasses.accentText} transition-colors`}>Overview</a>
            <a href="#time-machine" className={`hover:${themeClasses.accentText} transition-colors flex items-center gap-1.5`}>
              <span>30-Day Simulator</span>
              <span className={`text-[10px] font-mono ${themeClasses.accentBg} ${themeClasses.accentText} px-1.5 py-0.5 rounded border ${themeClasses.accentBorder}`}>New</span>
            </a>
            <a href="#calculator" className={`hover:${themeClasses.accentText} transition-colors`}>Health Calculator</a>
            <a href="#blueprint-generator" className={`hover:${themeClasses.accentText} transition-colors`}>Workout Planner</a>
            <a href="#ai-assistant" className={`hover:${themeClasses.accentText} transition-colors`}>AI Copilot</a>
            <a href="#faq" className={`hover:${themeClasses.accentText} transition-colors`}>FAQ</a>
          </div>

          {/* Nav Actions + Theme Color Switcher */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Orb Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800" title="Select UI Accent Theme">
              <button
                onClick={() => { setAccentTheme('emerald'); showToast('Accent theme: Emerald Matrix'); }}
                className={`w-5 h-5 rounded-full bg-emerald-500 transition-all ${accentTheme === 'emerald' ? 'ring-2 ring-emerald-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
                aria-label="Emerald Theme"
              />
              <button
                onClick={() => { setAccentTheme('cyan'); showToast('Accent theme: Cyber Cyan'); }}
                className={`w-5 h-5 rounded-full bg-cyan-400 transition-all ${accentTheme === 'cyan' ? 'ring-2 ring-cyan-300 scale-110' : 'opacity-60 hover:opacity-100'}`}
                aria-label="Cyan Theme"
              />
              <button
                onClick={() => { setAccentTheme('violet'); showToast('Accent theme: Violet Horizon'); }}
                className={`w-5 h-5 rounded-full bg-violet-500 transition-all ${accentTheme === 'violet' ? 'ring-2 ring-violet-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
                aria-label="Violet Theme"
              />
            </div>

            {/* Instant Demo Access Button */}
            <button
              onClick={handleInstantDemo}
              disabled={demoLoading}
              className={`hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl ${themeClasses.accentBg} hover:opacity-90 border ${themeClasses.accentBorder} ${themeClasses.badgeText} text-xs font-semibold font-mono transition-all hover:scale-[1.02] shadow-sm`}
              title="Test with pre-seeded demo user (demo@fittrack.com)"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{demoLoading ? 'Launching...' : '⚡ Try Instant Demo'}</span>
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className={`inline-flex items-center justify-center font-sora font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl bg-gradient-to-r ${themeClasses.primaryGradient} ${themeClasses.buttonText} shadow-lg transition-all transform hover:-translate-y-0.5 font-bold`}
              >
                Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors px-2 py-1"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={`inline-flex items-center justify-center font-sora font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r ${themeClasses.primaryGradient} ${themeClasses.buttonText} shadow-lg transition-all transform hover:-translate-y-0.5 font-bold`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="overview" className="relative pt-12 pb-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Vision & Action */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border ${themeClasses.accentBorder} ${themeClasses.badgeText} text-xs font-mono`}>
                <span className={`w-2 h-2 rounded-full ${accentTheme === 'emerald' ? 'bg-emerald-400' : accentTheme === 'cyan' ? 'bg-cyan-400' : 'bg-violet-400'} animate-pulse`} />
                <span>FITTRACK 3.0 · REAL-TIME HEALTH TELEMETRY</span>
              </div>

              {/* Title */}
              <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Precision Wellness.{' '}
                <span className={`bg-gradient-to-r ${accentTheme === 'emerald' ? 'from-emerald-400 via-teal-300 to-cyan-400' : accentTheme === 'cyan' ? 'from-cyan-400 via-sky-300 to-indigo-400' : 'from-violet-400 via-fuchsia-300 to-pink-400'} bg-clip-text text-transparent`}>
                  Driven by Data &amp; AI.
                </span>
              </h1>

              {/* Description */}
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
                Track nutrition macros, hydration rhythms, metabolic expenditure, and body composition in one unified high-performance platform with proactive AI health recommendations.
              </p>

              {/* CTA Group */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleInstantDemo}
                  disabled={demoLoading}
                  className={`inline-flex items-center justify-center font-sora font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl bg-gradient-to-r ${themeClasses.primaryGradient} ${themeClasses.buttonText} shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 gap-2`}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{demoLoading ? 'Connecting...' : 'Launch Instant Demo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#time-machine"
                  className="inline-flex items-center justify-center font-sora font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all transform hover:-translate-y-0.5 gap-2"
                >
                  <Timer className={`w-4 h-4 ${themeClasses.accentText}`} />
                  <span>Try 30-Day Simulator</span>
                </a>
              </div>

              {demoError && (
                <p className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg">
                  {demoError}
                </p>
              )}

              {/* Trust & Proof Strip */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white">99.4%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Macro Precision</div>
                </div>
                <div>
                  <div className={`font-mono text-xl sm:text-2xl font-bold ${themeClasses.accentText}`}>3.2x</div>
                  <div className="text-xs text-slate-400 mt-0.5">Habit Velocity</div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-cyan-400">24/7</div>
                  <div className="text-xs text-slate-400 mt-0.5">AI Wellness Copilot</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Dashboard Simulator */}
            <div className="lg:col-span-6">
              <div className={`relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl p-5 sm:p-6 backdrop-blur-xl ${themeClasses.glowClass}`}>
                {/* Simulator Window Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400 tracking-wider">
                      FITTRACK.OS / TELEMETRY
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-[11px] font-mono ${themeClasses.accentText} ${themeClasses.accentBg} px-2.5 py-0.5 rounded-full border ${themeClasses.accentBorder}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                    <span>LIVE SIMULATOR</span>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 mb-5 overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                    { id: 'hydration', label: 'Hydration', icon: Droplets },
                    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
                    { id: 'progress', label: 'Trends', icon: TrendingUp }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activePreviewTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActivePreviewTab(tab.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex-shrink-0 ${
                          isActive
                            ? `${themeClasses.accentBg} ${themeClasses.accentText} border ${themeClasses.accentBorder} shadow-sm font-bold`
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content 1: Overview */}
                {activePreviewTab === 'overview' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">BMI Score</div>
                        <div className="font-mono text-xl font-bold text-white my-0.5">22.4</div>
                        <div className={`text-[11px] ${themeClasses.accentText} flex items-center gap-1`}>
                          <CheckCircle2 className="w-3 h-3" /> Normal
                        </div>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Weight</div>
                        <div className="font-mono text-xl font-bold text-white my-0.5">68.2 kg</div>
                        <div className={`text-[11px] ${themeClasses.accentText} font-mono`}>−1.3 kg 30d</div>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Hydration</div>
                        <div className="font-mono text-xl font-bold text-cyan-400 my-0.5">
                          {((simWater / maxWater) * 100).toFixed(0)}%
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{(simWater / 1000).toFixed(1)} / 2.4 L</div>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Calories</div>
                        <div className="font-mono text-xl font-bold text-amber-400 my-0.5">1,860</div>
                        <div className="text-[11px] text-slate-400 font-mono">Target 2,100</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-mono text-slate-300">Activity &amp; Metabolic Burn</div>
                        <span className={`text-[10px] font-mono ${themeClasses.accentText} ${themeClasses.accentBg} px-2 py-0.5 rounded border ${themeClasses.accentBorder}`}>
                          +18% Peak Performance
                        </span>
                      </div>
                      <div className="h-20 w-full">
                        <svg viewBox="0 0 320 80" className="w-full h-full" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={themeClasses.accentHex} stopOpacity="0.4" />
                              <stop offset="100%" stopColor={themeClasses.accentHex} stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,60 Q30,50 60,55 T120,35 T180,45 T240,20 T300,25 T320,15 L320,80 L0,80 Z"
                            fill="url(#heroChartGrad)"
                          />
                          <path
                            d="M0,60 Q30,50 60,55 T120,35 T180,45 T240,20 T300,25 T320,15"
                            fill="none"
                            stroke={themeClasses.accentHex}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Hydration Hub */}
                {activePreviewTab === 'hydration' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                          Today's Hydration Target
                        </div>
                        <div className="font-mono text-3xl font-bold text-white">
                          {(simWater / 1000).toFixed(2)} <span className="text-sm font-normal text-slate-400">/ 2.40 L</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {maxWater - simWater > 0
                            ? `${maxWater - simWater} ml remaining to hit cellular hydration`
                            : '🎉 Daily hydration target accomplished!'}
                        </p>
                      </div>

                      <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-slate-800 border-2 border-slate-700">
                        <span className="font-mono text-sm font-bold text-cyan-300">
                          {((simWater / maxWater) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (simWater / maxWater) * 100)}%` }}
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSimWaterAdd(250)}
                        className="flex-1 py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Droplets className="w-3.5 h-3.5" /> +250 ml Glass
                      </button>
                      <button
                        onClick={() => handleSimWaterAdd(500)}
                        className="flex-1 py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Droplets className="w-3.5 h-3.5" /> +500 ml Bottle
                      </button>
                      <button
                        onClick={() => { setSimWater(1200); showToast('Hydration simulator reset'); }}
                        className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-mono transition-all"
                        title="Reset simulation"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Nutrition & Macros */}
                {activePreviewTab === 'nutrition' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono text-slate-300">Macro Allocation Today</span>
                        <span className="text-xs font-mono text-amber-400 font-bold">1,860 / 2,100 kcal</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className={themeClasses.accentText}>Protein (145g / 160g)</span>
                            <span className="text-slate-400">91%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '91%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-cyan-400">Carbs (210g / 235g)</span>
                            <span className="text-slate-400">89%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 h-full rounded-full" style={{ width: '89%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-amber-400">Fats (58g / 65g)</span>
                            <span className="text-slate-400">89%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: '89%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Utensils className={`w-4 h-4 ${themeClasses.accentText}`} />
                        <span>Last logged: <strong>Grilled Salmon Bowl</strong></span>
                      </div>
                      <span className="font-mono text-slate-400">540 kcal · 42g protein</span>
                    </div>
                  </div>
                )}

                {/* Tab Content 4: Progress Trends */}
                {activePreviewTab === 'progress' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono text-slate-300">7-Day Consistency Velocity</span>
                        <span className={`text-xs font-mono ${themeClasses.accentText} font-semibold`}>96% Streak</span>
                      </div>
                      <div className="flex items-end gap-2 h-24 pt-2">
                        {[
                          { day: 'Mon', val: '80%' },
                          { day: 'Tue', val: '100%' },
                          { day: 'Wed', val: '75%' },
                          { day: 'Thu', val: '95%' },
                          { day: 'Fri', val: '85%' },
                          { day: 'Sat', val: '100%' },
                          { day: 'Sun', val: '90%' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                            <div
                              className={`w-full rounded-t-md bg-gradient-to-t ${themeClasses.primaryGradient} transition-all duration-300`}
                              style={{ height: item.val }}
                            />
                            <span className="text-[10px] font-mono text-slate-500">{item.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Total 30-Day Deficit:</span>
                      <span className={`font-mono ${themeClasses.badgeText} font-bold`}>−14,800 kcal (~1.9 kg fat)</span>
                    </div>
                  </div>
                )}

                {/* Simulator Footer CTA */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Experience this live with real account data:</span>
                  <button
                    onClick={handleInstantDemo}
                    className={`font-mono font-semibold ${themeClasses.accentText} hover:opacity-80 flex items-center gap-1`}
                  >
                    Launch Live System <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 30-DAY TRANSFORMATION TIME MACHINE (NEW INTERACTIVE FEATURE) ===== */}
      <section id="time-machine" className="py-20 bg-slate-900/40 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${themeClasses.accentText} font-semibold mb-3 px-3 py-1 rounded-full ${themeClasses.accentBg} border ${themeClasses.accentBorder}`}>
              <Timer className="w-3.5 h-3.5" />
              <span>Predictive Transformation Simulator</span>
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-white mb-4">
              30-Day Physiological Time Machine
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Drag the timeline slider below to project how consecutive daily compliance with FitTrack's hydration, macro targets, and workouts shifts your body metrics over 30 days.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Slider Control Bar */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                  Simulation Day Timeline
                </span>
                <span className={`font-mono text-lg font-bold ${themeClasses.accentText} px-3 py-1 rounded-lg ${themeClasses.accentBg} border ${themeClasses.accentBorder}`}>
                  Day {simDay} of 30
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={simDay}
                onChange={(e) => setSimDay(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs font-mono text-slate-500 mt-2">
                <span>Day 1 (Baseline)</span>
                <span>Day 10 (Habit Formed)</span>
                <span>Day 20 (Metabolic Shift)</span>
                <span>Day 30 (Physique Peak)</span>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {/* Metric 1: Weight */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Projected Weight</span>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white my-1">
                  {simMetrics.weight} <small className="text-xs font-normal text-slate-400">kg</small>
                </div>
                <span className={`text-[11px] font-mono ${themeClasses.accentText}`}>
                  {(78.0 - Number(simMetrics.weight)).toFixed(1)} kg dropped
                </span>
              </div>

              {/* Metric 2: Body Fat */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Body Fat Est.</span>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white my-1">
                  {simMetrics.bodyFat} <small className="text-xs font-normal text-slate-400">%</small>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">
                  −{(25.2 - Number(simMetrics.bodyFat)).toFixed(1)}% composition
                </span>
              </div>

              {/* Metric 3: Resting HR */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Resting HR</span>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white my-1">
                  {simMetrics.rhr} <small className="text-xs font-normal text-slate-400">bpm</small>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  Cardiac efficiency ↑
                </span>
              </div>

              {/* Metric 4: Hydration */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Hydration Habit</span>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-400 my-1">
                  {simMetrics.waterPct}%
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Optimal cellular level
                </span>
              </div>

              {/* Metric 5: Consistency */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Streak Momentum</span>
                <div className={`font-mono text-2xl sm:text-3xl font-extrabold ${themeClasses.accentText} my-1`}>
                  {simMetrics.consistency}%
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  Unbreakable routine
                </span>
              </div>
            </div>

            {/* Projection Pathway Visual */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className={`w-5 h-5 ${themeClasses.accentText}`} />
                <span className="text-xs sm:text-sm text-slate-300">
                  At Day {simDay}, your estimated cumulative calorie burn is <strong>{Math.round(simDay * 480).toLocaleString()} kcal</strong> with sustained metabolic adaptation.
                </span>
              </div>
              <button
                onClick={handleInstantDemo}
                className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${themeClasses.primaryGradient} ${themeClasses.buttonText} text-xs font-bold font-sora shadow-md transition-all hover:scale-105 flex-shrink-0`}
              >
                Track My Real 30 Days ➔
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE HEALTH & METABOLIC CALCULATOR SECTION ===== */}
      <section id="calculator" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${themeClasses.accentText} font-semibold mb-3 px-3 py-1 rounded-full ${themeClasses.accentBg} border ${themeClasses.accentBorder}`}>
              <Sliders className="w-3.5 h-3.5" />
              <span>Real-Time Biometric Engine</span>
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Calculate Your Optimal Metabolic Blueprint
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Adjust your weight, height, and activity level below to instantly compute your exact BMI, Basal Metabolic Rate (BMR), and daily macronutrient targets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls: Sliders and Inputs */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-sora font-semibold text-white text-base">Your Biometrics</span>
                {/* Gender Toggle */}
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setCalcGender('male')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      calcGender === 'male' ? `${themeClasses.accentBg} ${themeClasses.accentText} font-bold` : 'text-slate-400'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setCalcGender('female')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      calcGender === 'female' ? `${themeClasses.accentBg} ${themeClasses.accentText} font-bold` : 'text-slate-400'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Slider 1: Weight */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase text-slate-300">Body Weight</label>
                  <span className={`font-mono text-lg font-bold ${themeClasses.accentText}`}>{calcWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>40 kg</span>
                  <span>100 kg</span>
                  <span>160 kg</span>
                </div>
              </div>

              {/* Slider 2: Height */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase text-slate-300">Height</label>
                  <span className="font-mono text-lg font-bold text-cyan-400">{calcHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>130 cm</span>
                  <span>175 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              {/* Activity Level Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">Weekly Activity Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    { val: 1.2, label: 'Sedentary', sub: 'Desk Job' },
                    { val: 1.375, label: 'Light', sub: '1-3 days' },
                    { val: 1.55, label: 'Moderate', sub: '3-5 days' },
                    { val: 1.725, label: 'Heavy', sub: '6-7 days' }
                  ].map((act) => (
                    <button
                      key={act.val}
                      onClick={() => setCalcActivity(act.val)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        calcActivity === act.val
                          ? `${themeClasses.accentBg} border-emerald-500 ${themeClasses.accentText} font-bold`
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-semibold">{act.label}</div>
                      <div className="text-[10px] text-slate-500">{act.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Fitness Goal */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">Primary Target Objective</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { id: 'lose', label: 'Fat Loss', desc: '-450 kcal' },
                    { id: 'maintain', label: 'Maintain', desc: 'Equilibrium' },
                    { id: 'gain', label: 'Muscle Gain', desc: '+350 kcal' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setCalcGoal(g.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        calcGoal === g.id
                          ? `bg-gradient-to-r ${themeClasses.accentBg} border-emerald-500/50 text-white font-bold`
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-semibold">{g.label}</div>
                      <div className={`text-[10px] ${themeClasses.accentText}`}>{g.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output: Real-time Calculated Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-sora font-semibold text-white text-base">Your Computed Results</span>
                <span className={`text-[11px] font-mono ${themeClasses.accentText}`}>INSTANT RECALC</span>
              </div>

              {/* BMI Card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400">Body Mass Index (BMI)</span>
                  <div className="font-mono text-3xl font-extrabold text-white mt-1">
                    {calculatedMetrics.bmi}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${calculatedMetrics.bmiColor}`}>
                  {calculatedMetrics.bmiCategory}
                </div>
              </div>

              {/* Metabolic Burn Numbers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Basal BMR</span>
                  <div className="font-mono text-xl font-bold text-white mt-0.5">
                    {calculatedMetrics.bmr} <span className="text-xs font-normal text-slate-400">kcal</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Resting baseline</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Daily Burn (TDEE)</span>
                  <div className="font-mono text-xl font-bold text-cyan-400 mt-0.5">
                    {calculatedMetrics.tdee} <span className="text-xs font-normal text-slate-400">kcal</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Maintenance total</span>
                </div>
              </div>

              {/* Target Calorie Recommendation */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono ${themeClasses.badgeText} font-semibold uppercase`}>Daily Recommended Intake</span>
                  <Flame className={`w-4 h-4 ${themeClasses.accentText}`} />
                </div>
                <div className={`font-mono text-3xl font-extrabold ${themeClasses.badgeText}`}>
                  {calculatedMetrics.targetCalories} <span className="text-sm font-normal text-slate-300">kcal / day</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Adjusted for your {calcGoal === 'lose' ? 'fat loss deficit' : calcGoal === 'gain' ? 'muscle gain surplus' : 'weight maintenance'} goal.
                </p>
              </div>

              {/* Macro Distribution Chips */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase mb-2 block">Optimal Macro Targets</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5">
                    <span className={`text-[10px] font-mono ${themeClasses.accentText} block font-semibold`}>PROTEIN</span>
                    <span className="font-mono text-lg font-bold text-white">{calculatedMetrics.macros.protein}g</span>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5">
                    <span className="text-[10px] font-mono text-cyan-400 block font-semibold">CARBS</span>
                    <span className="font-mono text-lg font-bold text-white">{calculatedMetrics.macros.carbs}g</span>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5">
                    <span className="text-[10px] font-mono text-amber-400 block font-semibold">FATS</span>
                    <span className="font-mono text-lg font-bold text-white">{calculatedMetrics.macros.fats}g</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleInstantDemo}
                className={`w-full py-3.5 px-4 bg-gradient-to-r ${themeClasses.primaryGradient} ${themeClasses.buttonText} font-sora font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2`}
              >
                <span>Track These Targets in Live Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SMART WORKOUT & NUTRITION BLUEPRINT GENERATOR (NEW FEATURE) ===== */}
      <section id="blueprint-generator" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${themeClasses.accentText} font-semibold mb-3 px-3 py-1 rounded-full ${themeClasses.accentBg} border ${themeClasses.accentBorder}`}>
              <Dumbbell className="w-3.5 h-3.5" />
              <span>On-Demand Daily Blueprint Generator</span>
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Instant Custom Routine &amp; Meal Structure
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Select your workout style, available training duration, and dietary preference to generate a customized training circuit and meal breakdown.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 border-b border-slate-800">
              {/* Focus */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Training Focus</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    { id: 'shred', label: 'Fat Shred' },
                    { id: 'muscle', label: 'Hypertrophy' },
                    { id: 'endurance', label: 'Endurance' },
                    { id: 'mobility', label: 'Mobility' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setGenFocus(f.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        genFocus === f.id
                          ? `${themeClasses.accentBg} border-emerald-500 ${themeClasses.accentText} font-bold`
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Duration</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {['25', '45', '65'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setGenTime(t)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        genTime === t
                          ? `${themeClasses.accentBg} border-emerald-500 ${themeClasses.accentText} font-bold`
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {t} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Diet */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Nutrition Style</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { id: 'protein', label: 'High Protein' },
                    { id: 'plant', label: 'Plant Power' },
                    { id: 'keto', label: 'Low Carb' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setGenDiet(d.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        genDiet === d.id
                          ? `${themeClasses.accentBg} border-emerald-500 ${themeClasses.accentText} font-bold`
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Results Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
              {/* Workout Block */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dumbbell className={`w-5 h-5 ${themeClasses.accentText}`} />
                    <h3 className="font-sora font-bold text-white text-base">Generated Training Circuit</h3>
                  </div>
                  <span className="font-mono text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
                    {blueprintOutput.duration}
                  </span>
                </div>
                <div className={`font-mono text-sm ${themeClasses.accentText} font-semibold`}>
                  {blueprintOutput.routine}
                </div>
                <div className="space-y-2 pt-2">
                  {blueprintOutput.exercises.map((ex, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-200">
                      <span className={`w-5 h-5 rounded-full ${themeClasses.accentBg} ${themeClasses.accentText} flex items-center justify-center font-mono font-bold text-[10px]`}>
                        {i + 1}
                      </span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Block */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-400" />
                    <h3 className="font-sora font-bold text-white text-base">Daily Meal Breakdown</h3>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    TARGET METRICS
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-400">
                  Estimated: <strong className="text-white">{blueprintOutput.totals}</strong>
                </div>
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="font-mono text-[10px] text-slate-400 uppercase block font-semibold">Breakfast</span>
                    <span className="text-slate-200">{blueprintOutput.meals.breakfast}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="font-mono text-[10px] text-slate-400 uppercase block font-semibold">Lunch</span>
                    <span className="text-slate-200">{blueprintOutput.meals.lunch}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="font-mono text-[10px] text-slate-400 uppercase block font-semibold">Snack / Post-Workout</span>
                    <span className="text-slate-200">{blueprintOutput.meals.snack}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <span className="font-mono text-[10px] text-slate-400 uppercase block font-semibold">Dinner</span>
                    <span className="text-slate-200">{blueprintOutput.meals.dinner}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE AI HEALTH COPILOT PLAYGROUND ===== */}
      <section id="ai-assistant" className="py-20 bg-slate-900/80 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${themeClasses.accentText} font-semibold mb-3 px-3 py-1 rounded-full ${themeClasses.accentBg} border ${themeClasses.accentBorder}`}>
              <Bot className="w-3.5 h-3.5" />
              <span>AI Health Copilot</span>
            </div>
            <h2 className="font-sora text-3xl sm:text-4xl font-bold text-white mb-4">
              Test Your Personal AI Health Companion
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Experience the intelligence that answers your queries on diet, recovery, hydration, and exercise mechanics in real time.
            </p>
          </div>

          <div className={`max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden ${themeClasses.glowClass}`}>
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${themeClasses.primaryGradient} flex items-center justify-center text-slate-950 font-bold shadow-md`}>
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white flex items-center gap-2">
                    FitTrack Health Copilot
                    <span className={`text-[10px] font-mono ${themeClasses.accentText} ${themeClasses.accentBg} px-2 py-0.5 rounded border ${themeClasses.accentBorder}`}>
                      GPT-4o Enhanced
                    </span>
                  </div>
                  <div className={`text-xs ${themeClasses.accentText} flex items-center gap-1.5`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current inline-block animate-pulse" />
                    Telemetric context linked &amp; online
                  </div>
                </div>
              </div>
              <span className="font-mono text-[11px] text-slate-500">INTERACTIVE PREVIEW</span>
            </div>

            <div className="p-6 space-y-4 min-h-[220px]">
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-emerald-600 text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm leading-relaxed shadow-md">
                  {activeQuestion}
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[85%] bg-slate-900 text-slate-200 text-sm px-4 py-3 rounded-2xl rounded-tl-sm leading-relaxed border border-slate-800 shadow-sm flex items-start gap-3">
                  <Sparkles className={`w-4 h-4 ${themeClasses.accentText} flex-shrink-0 mt-0.5`} />
                  <div>
                    {aiTyping ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.15s]" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
                      </div>
                    ) : (
                      <span>{aiResponse}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-800 flex flex-wrap gap-2">
              <span className="text-[11px] font-mono text-slate-500 w-full mb-1">Click a sample prompt to test:</span>
              {Object.keys(aiKnowledgeBase).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptSelect(prompt)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left ${
                    activeQuestion === prompt
                      ? `${themeClasses.accentBg} ${themeClasses.badgeText} border-emerald-500/40 font-semibold`
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleCustomAiSubmit} className="p-4 border-t border-slate-800 flex items-center gap-3 bg-slate-950">
              <input
                type="text"
                value={aiCustomInput}
                onChange={(e) => setAiCustomInput(e.target.value)}
                placeholder="Ask any custom health or nutrition question..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                className={`w-10 h-10 rounded-xl bg-gradient-to-r ${themeClasses.primaryGradient} flex items-center justify-center ${themeClasses.buttonText} shadow-md flex-shrink-0 transition-transform active:scale-95`}
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) ===== */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${themeClasses.accentText} font-semibold mb-3 px-3 py-1 rounded-full ${themeClasses.accentBg} border ${themeClasses.accentBorder}`}>
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions &amp; Clarity</span>
            </div>
            <h2 className="font-sora text-3xl font-extrabold text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to know about the FitTrack platform and telemetry architecture.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does FitTrack compute my daily calorie target and BMR?',
                a: 'FitTrack uses the clinically validated Mifflin-St Jeor equation factoring in your weight, height, age, and activity multiplier. Targets are dynamically adjusted based on whether your primary objective is a sustained caloric deficit (fat loss) or hyper-caloric surplus (muscle gain).'
              },
              {
                q: 'Is my health data saved securely in real time?',
                a: 'Yes! In the full application, your data is securely persisted in MongoDB Atlas using encrypted JWT authentication. In addition, the standalone prototype supports seamless offline-first localStorage backup.'
              },
              {
                q: 'How does the 1-Click Instant Demo work?',
                a: 'Clicking any "Instant Demo" button automatically logs into the pre-seeded demo user (demo@fittrack.com) with complete workouts, meals, hydration, and progression data ready for you to explore immediately.'
              },
              {
                q: 'Can I track both workouts and detailed nutrition macros?',
                a: 'Absolutely. FitTrack gives you unified tracking for cardio and strength workouts alongside exact grams of protein, carbohydrates, healthy fats, and fluid intake.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ONE-CLICK INSTANT DEMO CALLOUT BANNER ===== */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-y border-emerald-500/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-6">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${themeClasses.accentBg} border ${themeClasses.accentBorder} ${themeClasses.badgeText} font-mono text-xs`}>
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>ZERO SETUP REQUIRED · INSTANT ACCESS</span>
          </div>

          <h2 className="font-sora text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Take Command of Your Fitness?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Experience the complete workable dashboard right now. Pre-loaded with realistic nutrition, hydration, and weight telemetry.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleInstantDemo}
              disabled={demoLoading}
              className={`inline-flex items-center justify-center font-sora font-bold text-base px-8 py-4 rounded-xl bg-gradient-to-r ${themeClasses.primaryGradient} ${themeClasses.buttonText} shadow-xl transition-all transform hover:-translate-y-0.5 gap-2`}
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>{demoLoading ? 'Authenticating...' : '⚡ Launch Instant Demo'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center font-sora font-semibold text-base px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition-all transform hover:-translate-y-0.5"
            >
              Create New Account
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-4 h-4 ${themeClasses.accentText}`} /> Free Forever Tier
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-4 h-4 ${themeClasses.accentText}`} /> Real-Time MongoDB Sync
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-4 h-4 ${themeClasses.accentText}`} /> Privacy First
            </span>
          </div>
        </div>
      </section>

      {/* ===== REFINED GLASSMORPHIC FOOTER ===== */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5 font-sora font-bold text-lg text-white">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${themeClasses.primaryGradient} flex items-center justify-center text-slate-950 font-bold`}>
                  <Activity className="w-4 h-4" />
                </div>
                <span>FITTRACK 3.0</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Next-generation precision health telemetry and AI wellness guidance. Transform daily check-ins into continuous, measurable progress.
              </p>
              <div className={`flex items-center gap-2 text-xs font-mono ${themeClasses.accentText}`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span>Backend API: Online (Port 5000)</span>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold mb-3">
                App Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#overview" className={`hover:${themeClasses.accentText} transition-colors`}>Overview</a></li>
                <li><a href="#time-machine" className={`hover:${themeClasses.accentText} transition-colors`}>30-Day Simulator</a></li>
                <li><a href="#calculator" className={`hover:${themeClasses.accentText} transition-colors`}>Health Calculator</a></li>
                <li><a href="#blueprint-generator" className={`hover:${themeClasses.accentText} transition-colors`}>Workout Planner</a></li>
                <li><a href="#ai-assistant" className={`hover:${themeClasses.accentText} transition-colors`}>AI Health Copilot</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold mb-3">
                Quick Access
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={handleInstantDemo} className={`hover:${themeClasses.accentText} transition-colors flex items-center gap-1`}>
                    ⚡ Instant Demo Login
                  </button>
                </li>
                <li><Link to="/login" className={`hover:${themeClasses.accentText} transition-colors`}>Sign In</Link></li>
                <li><Link to="/signup" className={`hover:${themeClasses.accentText} transition-colors`}>Register Account</Link></li>
                <li><Link to="/dashboard" className={`hover:${themeClasses.accentText} transition-colors`}>Dashboard SPA</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <span>© 2026 FitTrack Systems. All rights reserved.</span>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span>React 18</span>
              <span>•</span>
              <span>Vite</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Node / Express</span>
              <span>•</span>
              <span>MongoDB</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Quick Dock */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-2 rounded-2xl shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => handleSimWaterAdd(250)}
          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono flex items-center gap-1 border border-cyan-500/20 transition-all active:scale-95"
          title="Quick log 250ml water in simulator"
        >
          <Droplets className="w-3.5 h-3.5" /> +250ml
        </button>
        <button
          onClick={handleInstantDemo}
          className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${themeClasses.primaryGradient} ${themeClasses.buttonText} text-xs font-mono font-bold flex items-center gap-1 shadow-md transition-all active:scale-95`}
          title="Instant 1-click login & dashboard open"
        >
          <Zap className="w-3.5 h-3.5 fill-current" /> Demo App
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-emerald-500 text-white px-4 py-2.5 rounded-full text-xs font-mono shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
