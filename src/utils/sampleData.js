function createEyeSvgUri(type) {
  let irisGradient = '';
  let lensOpacityOverlay = '';

  if (type === 'normal') {
    irisGradient = `
      <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="50%" stop-color="#0369a1" />
        <stop offset="100%" stop-color="#082f49" />
      </radialGradient>
    `;
    lensOpacityOverlay = `
      <circle cx="200" cy="200" r="45" fill="#020617" opacity="0.95" />
      <circle cx="185" cy="185" r="10" fill="#ffffff" opacity="0.8" />
    `;
  } else if (type === 'nuclear') {
    irisGradient = `
      <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="60%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0f172a" />
      </radialGradient>
    `;
    lensOpacityOverlay = `
      <circle cx="200" cy="200" r="48" fill="#451a03" opacity="0.9" />
      <circle cx="200" cy="200" r="32" fill="#d97706" opacity="0.75" />
      <circle cx="200" cy="200" r="20" fill="#f59e0b" opacity="0.85" />
    `;
  } else if (type === 'cortical') {
    irisGradient = `
      <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#06b6d4" />
        <stop offset="100%" stop-color="#164e63" />
      </radialGradient>
    `;
    lensOpacityOverlay = `
      <circle cx="200" cy="200" r="48" fill="#0f172a" opacity="0.9" />
      <g stroke="#e2e8f0" stroke-width="6" opacity="0.8" stroke-linecap="round">
        <line x1="200" y1="200" x2="160" y2="170" />
        <line x1="200" y1="200" x2="240" y2="175" />
        <line x1="200" y1="200" x2="170" y2="235" />
        <line x1="200" y1="200" x2="230" y2="230" />
      </g>
    `;
  } else if (type === 'mature') {
    irisGradient = `
      <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0f172a" />
      </radialGradient>
    `;
    lensOpacityOverlay = `
      <circle cx="200" cy="200" r="50" fill="#f8fafc" opacity="0.92" />
      <circle cx="200" cy="200" r="35" fill="#e2e8f0" opacity="0.8" />
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>${irisGradient}</defs>
      <rect width="400" height="400" fill="#090d16" />
      <ellipse cx="200" cy="200" rx="160" ry="110" fill="#f8fafc" />
      <circle cx="200" cy="200" r="85" fill="url(#irisGrad)" />
      ${lensOpacityOverlay}
      <path d="M 140 140 A 80 80 0 0 1 260 140" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.35" stroke-linecap="round" />
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_EYES = [
  {
    id: 'normal_1',
    name: 'Normal Healthy Eye',
    category: 'Normal',
    description: 'Clear crystalline lens, transparent optical axis, no nuclear opacity observed.',
    image: createEyeSvgUri('normal'),
    expectedClass: 'Normal / Healthy Eye',
    expectedConfidence: 98.4,
    stage: 'Stage 0 - Clear',
    opacityScore: 0.04,
    surgicalUrgency: 'None Required',
    riskLevel: 'Low'
  },
  {
    id: 'nuclear_1',
    name: 'Nuclear Sclerosis Cataract',
    category: 'Nuclear',
    description: 'Central lens core yellowing & browning. Moderate visual acuity clouding.',
    image: createEyeSvgUri('nuclear'),
    expectedClass: 'Nuclear Cataract Detected',
    expectedConfidence: 96.8,
    stage: 'Stage 2 - Moderate Nuclear Sclerosis',
    opacityScore: 0.68,
    surgicalUrgency: 'Elective / 6-12 Months',
    riskLevel: 'Moderate'
  },
  {
    id: 'cortical_1',
    name: 'Cortical Spoke Cataract',
    category: 'Cortical',
    description: 'Wedge-like peripheral opacities extending into central pupillary axis.',
    image: createEyeSvgUri('cortical'),
    expectedClass: 'Cortical Cataract Detected',
    expectedConfidence: 94.2,
    stage: 'Stage 2 - Cortical Spoke Formation',
    opacityScore: 0.54,
    surgicalUrgency: 'Monitor 3-6 Months',
    riskLevel: 'Moderate'
  },
  {
    id: 'mature_1',
    name: 'Mature Dense Cataract',
    category: 'Mature',
    description: 'Total lens opacity with complete white pupil occlusion. Severe visual impairment.',
    image: createEyeSvgUri('mature'),
    expectedClass: 'Mature Cataract Detected',
    expectedConfidence: 99.1,
    stage: 'Stage 4 - Advanced Mature Cataract',
    opacityScore: 0.96,
    surgicalUrgency: 'High Priority (Phacoemulsification)',
    riskLevel: 'High'
  }
];
