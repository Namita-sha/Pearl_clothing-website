import React, { useState, useRef } from 'react';
import axios from 'axios';
import './AIStylist.css';

// ─── Step definitions for the questionnaire ───────────────────────────────────
const STEPS = [
  {
    id: 'gender',
    question: 'What is your gender preference for styling?',
    type: 'choice',
    options: [
      { value: 'women', label: 'Women', sub: "Women's collection" },
      { value: 'men',   label: 'Men',   sub: "Men's collection"   },
    ],
  },
  {
    id: 'undertone',
    question: 'What is your skin undertone?',
    hint: 'Look at your inner wrist veins: blue/purple = cool, green = warm, both = neutral',
    type: 'choice',
    options: [
      { value: 'warm',    label: 'Warm',    sub: 'Golden, peachy, yellow hues' },
      { value: 'cool',    label: 'Cool',    sub: 'Pink, red, bluish hues'      },
      { value: 'neutral', label: 'Neutral', sub: 'Mix of both'                 },
    ],
  },
  {
    id: 'skinTone',
    question: 'What is your skin tone?',
    type: 'choice',
    options: [
      { value: 'fair',   label: 'Fair'   },
      { value: 'light',  label: 'Light'  },
      { value: 'medium', label: 'Medium' },
      { value: 'tan',    label: 'Tan'    },
      { value: 'deep',   label: 'Deep'   },
    ],
  },
  {
    id: 'bodyType',
    question: 'How would you describe your body type?',
    type: 'choice',
    options: [
      { value: 'slim',     label: 'Slim',         sub: 'Lean, straight frame'          },
      { value: 'athletic', label: 'Athletic',      sub: 'Toned, defined shoulders'      },
      { value: 'curvy',    label: 'Curvy',         sub: 'Defined waist, fuller hips'    },
      { value: 'plus',     label: 'Full-Figured',  sub: 'Rounder, fuller frame'         },
      { value: 'petite',   label: 'Petite',        sub: 'Smaller, shorter frame'        },
    ],
  },
  {
    id: 'stylePreference',
    question: 'Which style speaks to you most?',
    type: 'choice',
    options: [
      { value: 'Elegant / Old Money', label: 'Old Money',   sub: 'Quiet luxury, timeless'   },
      { value: 'Minimalist',          label: 'Minimalist',  sub: 'Clean, simple, refined'   },
      { value: 'Casual Chic',         label: 'Casual Chic', sub: 'Effortless everyday'      },
      { value: 'Edgy / Contemporary', label: 'Edgy',        sub: 'Bold, modern, daring'     },
      { value: 'Romantic / Feminine', label: 'Romantic',    sub: 'Soft, delicate, feminine' },
    ],
  },
  {
    id: 'occasion',
    question: 'What are you dressing for?',
    type: 'choice',
    options: [
      { value: 'casual',  label: 'Casual',          sub: 'Everyday, college, outings' },
      { value: 'formal',  label: 'Formal / Office', sub: 'Work, meetings'             },
      { value: 'evening', label: 'Evening / Party', sub: 'Dinner, events'             },
      { value: 'date',    label: 'Date Night',      sub: 'Intimate, special'          },
      { value: 'wedding', label: 'Wedding / Festive', sub: 'Celebrations'             },
    ],
  },
  {
    id: 'budget',
    question: 'What is your budget range?',
    type: 'choice',
    options: [
      { value: '1000-3000',  label: 'Rs 1,000 - Rs 3,000',  sub: 'Accessible luxury'   },
      { value: '3000-6000',  label: 'Rs 3,000 - Rs 6,000',  sub: 'Premium range'       },
      { value: '6000-10000', label: 'Rs 6,000 - Rs 10,000', sub: 'High-end pieces'     },
      { value: '10000+',     label: 'Rs 10,000+',            sub: 'Investment wardrobe' },
    ],
  },
  {
    id: 'preferredColors',
    question: 'Which colors do you gravitate towards?',
    type: 'multiChoice',
    options: [
      { value: 'Neutrals (beige, white, cream)',    label: 'Neutrals'    },
      { value: 'Earth tones (brown, rust, olive)',  label: 'Earth Tones' },
      { value: 'Pastels (blush, lavender, mint)',   label: 'Pastels'     },
      { value: 'Bold (red, emerald, cobalt)',        label: 'Bold Colors' },
      { value: 'Monochrome (black, grey, white)',   label: 'Monochrome'  },
    ],
  },
];

const TOTAL_STEPS = STEPS.length;

// ─── Main Component ────────────────────────────────────────────────────────────
const AIStylist = () => {
  const [mode, setMode]         = useState('landing');
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState({});
  const [image, setImage]       = useState(null);
  const [preview, setPreview]   = useState(null);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');
  const fileRef                 = useRef();

  const toBase64 = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = () => res(r.result.split(',')[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

  const currentStep = STEPS[step];
  const progress    = (step / TOTAL_STEPS) * 100;

  const handleChoice = (value) => {
    const updated = { ...answers, [currentStep.id]: value };
    setAnswers(updated);
    if (step < TOTAL_STEPS - 1) {
      setTimeout(() => setStep(s => s + 1), 300);
    }
  };

  const handleMultiChoice = (value) => {
    const current = answers[currentStep.id] || [];
    const next    = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setAnswers({ ...answers, [currentStep.id]: next });
  };

  const handleSubmitQuestionnaire = async () => {
    setMode('loading');
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/style-me', {
        gender:      answers.gender,
        occasion:    answers.occasion,
        userProfile: {
          skinTone:        answers.skinTone,
          undertone:       answers.undertone,
          bodyType:        answers.bodyType,
          stylePreference: answers.stylePreference,
          fitPreference:   'regular fit',
          budget:          answers.budget,
          preferredColors: Array.isArray(answers.preferredColors)
                             ? answers.preferredColors.join(', ')
                             : answers.preferredColors,
          avoidColors:     'Neon',
        },
      });
      setResult(data);
      setMode('result');
    } catch {
      setError('AI styling failed. Please check your API key and try again.');
      setMode('questionnaire');
    }
  };

  const handleSubmitPhoto = async () => {
    if (!image) return setError('Please upload a photo first.');
    setMode('loading');
    setError('');
    try {
      const base64   = await toBase64(image);
      const mimeType = image.type;
      const { data } = await axios.post('http://localhost:5000/api/ai/style-me', {
        imageBase64: base64,
        mimeType,
        gender:   answers.gender   || 'women',
        occasion: answers.occasion || 'casual',
        userProfile: Object.keys(answers).length > 1 ? answers : null,
      });
      setResult(data);
      setMode('result');
    } catch {
      setError('AI styling failed. Please check your API key and try again.');
      setMode('photo');
    }
  };

  const handleQuickMode = async () => {
    setMode('loading');
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/style-me', {
        quickMode: true,
        gender:    answers.gender   || 'women',
        occasion:  answers.occasion || 'casual',
      });
      setResult(data);
      setMode('result');
    } catch {
      setError('AI styling failed. Please check your API key and try again.');
      setMode('landing');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError('');
  };

  const reset = () => {
    setMode('landing'); setStep(0); setAnswers({});
    setImage(null); setPreview(null); setResult(null); setError('');
  };

  // ── Landing ──────────────────────────────────────────────────────────────────
  if (mode === 'landing') return (
    <div className="ai-page">
      <div className="ai-hero">
        <p className="ai-eyebrow">PEARL INTELLIGENCE</p>
        <h1 className="ai-title">Your Personal<br />Style Advisor</h1>
        <p className="ai-subtitle">
          Tell PEARL about yourself. Get a curated wardrobe from our collection,
          built around your exact features, undertone, and aesthetic.
        </p>
      </div>

      <div className="landing-cards">
        <div className="landing-card primary" onClick={() => setMode('questionnaire')}>
          <div className="card-icon">—</div>
          <h3>Style Quiz</h3>
          <p>Answer 8 quick questions. Get a fully personalized report with outfit ideas, color palette, and accessories.</p>
          <span className="card-cta">Start Quiz</span>
        </div>

        <div className="landing-card" onClick={() => setMode('photo')}>
          <div className="card-icon">—</div>
          <h3>Photo Analysis</h3>
          <p>Upload your photo. PEARL's AI reads your features and recommends what truly suits you.</p>
          <span className="card-cta">Upload Photo</span>
        </div>

        <div className="landing-card quick" onClick={handleQuickMode}>
          <div className="card-icon">—</div>
          <h3>Quick Style</h3>
          <p>Skip the questions. See PEARL's best picks right now — our most versatile, universally flattering pieces.</p>
          <span className="card-cta">Skip and Show Me</span>
        </div>
      </div>
    </div>
  );

  // ── Loading ───────────────────────────────────────────────────────────────────
  if (mode === 'loading') return (
    <div className="ai-page ai-loading-page">
      <div className="loading-content">
        <div className="loading-ring"></div>
        <p className="loading-label">PEARL is reading your style DNA...</p>
        <p className="loading-sub">Analyzing features · Matching inventory · Curating your look</p>
      </div>
    </div>
  );

  // ── Questionnaire ─────────────────────────────────────────────────────────────
  if (mode === 'questionnaire') {
    const isLast   = step === TOTAL_STEPS - 1;
    const stepData = STEPS[step];

    return (
      <div className="ai-page quiz-page">
        <div className="quiz-header">
          <button className="back-btn" onClick={() => step > 0 ? setStep(s => s - 1) : setMode('landing')}>Back</button>
          <div className="progress-wrap">
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <span className="progress-label">Step {step + 1} of {TOTAL_STEPS}</span>
          </div>
          <button className="skip-link" onClick={handleQuickMode}>Skip</button>
        </div>

        <div className="quiz-body">
          <p className="quiz-step-num">Question {step + 1}</p>
          <h2 className="quiz-question">{stepData.question}</h2>
          {stepData.hint && <p className="quiz-hint">{stepData.hint}</p>}

          <div className={`quiz-options ${stepData.options.length <= 3 ? 'cols-3' : stepData.options.length === 4 ? 'cols-2' : 'cols-auto'}`}>
            {stepData.options.map(opt => {
              const isMulti    = stepData.type === 'multiChoice';
              const isSelected = isMulti
                ? (answers[stepData.id] || []).includes(opt.value)
                : answers[stepData.id] === opt.value;

              return (
                <button
                  key={opt.value}
                  className={`quiz-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => isMulti ? handleMultiChoice(opt.value) : handleChoice(opt.value)}
                >
                  <span className="opt-label">{opt.label}</span>
                  {opt.sub && <span className="opt-sub">{opt.sub}</span>}
                </button>
              );
            })}
          </div>

          {error && <p className="ai-error">{error}</p>}

          {isLast && (
            <button
              className="analyze-btn"
              disabled={!(answers[stepData.id]?.length > 0)}
              onClick={handleSubmitQuestionnaire}
            >
              Reveal My Style Report
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Photo mode ────────────────────────────────────────────────────────────────
  if (mode === 'photo') return (
    <div className="ai-page photo-page">
      <div className="ai-hero">
        <p className="ai-eyebrow">PHOTO ANALYSIS</p>
        <h1 className="ai-title" style={{ fontSize: '2rem' }}>Upload Your Photo</h1>
        <p className="ai-subtitle">PEARL will analyze your features and recommend pieces from our collection that suit you best.</p>
      </div>

      <div className="photo-layout">
        <div className="upload-zone" onClick={() => fileRef.current.click()}>
          {preview
            ? <img src={preview} alt="Your photo" className="preview-img" />
            : <div className="upload-placeholder">
                <p>Click to upload your photo</p>
                <p className="upload-hint">Clear face preferred · JPG, JPEG or PNG</p>
              </div>
          }
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        <div className="photo-selects">
          <div className="control-group">
            <label>Gender</label>
            <div className="toggle-group">
              {['women', 'men'].map(g => (
                <button
                  key={g}
                  className={`toggle-btn ${(answers.gender || 'women') === g ? 'active' : ''}`}
                  onClick={() => setAnswers(a => ({ ...a, gender: g }))}
                >
                  {g === 'women' ? 'Women' : 'Men'}
                </button>
              ))}
            </div>
          </div>
          <div className="control-group">
            <label>Occasion</label>
            <select
              value={answers.occasion || 'casual'}
              onChange={e => setAnswers(a => ({ ...a, occasion: e.target.value }))}
              className="occasion-select"
            >
              <option value="casual">Casual / Everyday</option>
              <option value="formal">Formal / Office</option>
              <option value="evening">Evening / Party</option>
              <option value="date">Date Night</option>
              <option value="wedding">Wedding / Festive</option>
            </select>
          </div>
        </div>

        {error && <p className="ai-error">{error}</p>}

        <div className="photo-actions">
          <button className="analyze-btn" onClick={handleSubmitPhoto} disabled={!image}>
            Analyze My Style
          </button>
          <button className="ghost-btn" onClick={() => setMode('landing')}>Go Back</button>
        </div>
      </div>
    </div>
  );

  // ── Result ────────────────────────────────────────────────────────────────────
  if (mode === 'result' && result) {
    const isQuestionnaire = result.mode === 'questionnaire';
    const isQuick         = result.mode === 'quick';

    return (
      <div className="ai-page result-page">
        <div className="result-header">
          <div>
            <p className="ai-eyebrow">PEARL STYLE REPORT</p>
            <h1 className="result-title">
              {isQuick ? 'Our Best Picks for You' : 'Your Personalized Style'}
            </h1>
          </div>
          <button className="ghost-btn" onClick={reset}>Retake</button>
        </div>

        {result.analysis && (
          <div className="analysis-section">
            <p className="section-label">STYLE PROFILE</p>
            <div className="analysis-grid">
              {Object.entries(result.analysis).map(([key, val]) => val && (
                <div className="analysis-chip" key={key}>
                  <span className="chip-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                  <span className="chip-value">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.colorPalette && (
          <div className="palette-section">
            <p className="section-label">YOUR COLOR PALETTE</p>
            <div className="palette-row">
              {(Array.isArray(result.colorPalette)
                ? result.colorPalette
                : result.colorPalette.bestColors || []
              ).map((color, i) => (
                <div className="palette-chip" key={i}>
                  <div className="palette-swatch" style={{ background: color.startsWith('#') ? color : color }} />
                  <span>{color}</span>
                </div>
              ))}
            </div>
            {result.colorPalette.why && (
              <p className="palette-why">{result.colorPalette.why}</p>
            )}
          </div>
        )}

        <div className="recs-section">
          <p className="section-label">CURATED FOR YOU</p>
          <div className="recs-grid">
            {result.recommendations?.map((rec, i) => (
              <div className="rec-card" key={i}>
                {rec.product?.image && (
                  <div className="rec-img-wrap">
                    <img src={rec.product.image} alt={rec.productName} className="rec-img" />
                    <span className="rec-badge">#{i + 1}</span>
                  </div>
                )}
                <div className="rec-body">
                  <div className="rec-top">
                    <h4 className="rec-name">{rec.productName}</h4>
                    {rec.price && <span className="rec-price">Rs {rec.price.toLocaleString()}</span>}
                  </div>
                  {rec.outfitIdea && <p className="rec-outfit">{rec.outfitIdea}</p>}
                  <p className="rec-reason">{rec.reason}</p>
                  <p className="rec-tip">{rec.stylingTip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isQuestionnaire && result.accessories && (
          <div className="accessories-section">
            <p className="section-label">COMPLETE THE LOOK</p>
            <div className="acc-grid">
              <div className="acc-card">
                <div>
                  <p className="acc-label">Bags</p>
                  <p className="acc-val">{result.accessories.bags}</p>
                </div>
              </div>
              <div className="acc-card">
                <div>
                  <p className="acc-label">Footwear</p>
                  <p className="acc-val">{result.accessories.footwear}</p>
                </div>
              </div>
              <div className="acc-card">
                <div>
                  <p className="acc-label">Fragrance Notes</p>
                  <p className="acc-val">{result.accessories.perfumeNotes}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {result.overallTip && (
          <div className="overall-tip">
            <p>"{result.overallTip}"</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="analyze-btn" style={{ maxWidth: 300 }} onClick={reset}>
            Style Me Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AIStylist;