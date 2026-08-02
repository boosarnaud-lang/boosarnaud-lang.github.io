import './DomainExpertise.css';
import { domainExpertise } from '../data/portfolio.js';

const ICONS = ['🔍', '⚙️', '🔗', '📊'];
const TAGS = [
  ['VIN', 'Plates', 'WMI'],
  ['OEM', 'IAM', 'Cross-ref'],
  ['TecDoc', 'TecRMI', 'Standards'],
  ['ETL', 'Rev. Eng.', 'QA'],
];

export default function DomainExpertise() {
  const leftCards = domainExpertise.slice(0, 2);
  const rightCards = domainExpertise.slice(2, 4);

  return (
    <section id="domain" className="domain-section">
      <div className="domain-glow domain-glow--amber"></div>
      <div className="domain-glow domain-glow--blue"></div>

      <h2 className="domain-title">Domain Expertise</h2>

      <div className="domain-layout">
        {/* Left cards */}
        <div className="domain-cards domain-cards--left">
          {leftCards.map((card, i) => (
            <div key={i} className="domain-card">
              <span className="domain-card__icon">{ICONS[i]}</span>
              <h3 className="domain-card__title">{card.title}</h3>
              <p className="domain-card__desc">{card.desc}</p>
              <div className="domain-card__tags">
                {TAGS[i].map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="domain-connector domain-connector--right"></div>
            </div>
          ))}
        </div>

        {/* Exploded Car SVG */}
        <div className="domain-car-container">
          <svg className="domain-car-svg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" fill="none">
            {/* Body Shell */}
            <g className="car-part car-part--body">
              <path d="M90 200 L90 185 Q90 175 100 175 L160 175 L180 145 Q185 138 195 135 L380 135 Q390 135 395 140 L430 175 L500 175 Q510 175 510 185 L510 200 Q510 210 500 215 L490 220 L110 220 L100 215 Q90 210 90 200 Z" className="car-path car-path--body" />
              <line x1="250" y1="145" x2="250" y2="215" className="car-detail" />
              <rect x="265" y="172" width="20" height="4" rx="2" className="car-detail" />
              <line x1="120" y1="195" x2="480" y2="195" className="car-detail car-detail--trim" />
            </g>

            {/* Windows / Roof */}
            <g className="car-part car-part--windows">
              <path d="M188 140 L195 125 Q200 115 215 112 L350 112 Q365 112 372 118 L405 140 L395 140 L365 120 Q360 116 350 115 L215 115 Q208 115 205 120 L192 140 Z" className="car-path car-path--roof" />
              <path d="M192 140 L205 120 Q208 115 215 115 L248 115 L248 140 Z" className="car-path car-path--window" />
              <path d="M252 115 L350 115 Q358 115 363 118 L395 140 L252 140 Z" className="car-path car-path--window" />
              <line x1="200" y1="112" x2="370" y2="112" className="car-detail car-detail--rail" />
            </g>

            {/* Front bumper + headlight */}
            <g className="car-part car-part--front">
              <path d="M80 200 L80 190 Q80 180 90 178 L100 175 L100 215 L90 212 Q80 208 80 200 Z" className="car-path car-path--bumper" />
              <path d="M82 185 Q78 185 78 190 L78 198 Q78 202 82 202 L92 200 L92 187 Z" className="car-path car-path--headlight" />
              <line x1="80" y1="192" x2="90" y2="192" className="car-detail" />
              <line x1="80" y1="196" x2="90" y2="196" className="car-detail" />
            </g>

            {/* Rear bumper + taillight */}
            <g className="car-part car-part--rear">
              <path d="M510 178 L520 180 Q528 182 528 190 L528 200 Q528 208 520 212 L510 215 L510 175 Z" className="car-path car-path--bumper" />
              <path d="M518 183 Q522 183 522 188 L522 196 Q522 200 518 200 L512 198 L512 185 Z" className="car-path car-path--taillight" />
              <ellipse cx="520" cy="218" rx="6" ry="3" className="car-path car-path--exhaust" />
            </g>

            {/* Wheels */}
            <g className="car-part car-part--wheels">
              <circle cx="170" cy="225" r="30" className="car-path car-path--tire" />
              <circle cx="170" cy="225" r="20" className="car-path car-path--rim" />
              <circle cx="170" cy="225" r="5" className="car-path car-path--hub" />
              <line x1="170" y1="208" x2="170" y2="215" className="car-detail car-detail--spoke" />
              <line x1="183" y1="215" x2="178" y2="220" className="car-detail car-detail--spoke" />
              <line x1="187" y1="225" x2="180" y2="225" className="car-detail car-detail--spoke" />
              <line x1="183" y1="235" x2="178" y2="230" className="car-detail car-detail--spoke" />
              <line x1="170" y1="242" x2="170" y2="235" className="car-detail car-detail--spoke" />
              <line x1="157" y1="235" x2="162" y2="230" className="car-detail car-detail--spoke" />
              <line x1="153" y1="225" x2="160" y2="225" className="car-detail car-detail--spoke" />
              <line x1="157" y1="215" x2="162" y2="220" className="car-detail car-detail--spoke" />
              <circle cx="430" cy="225" r="30" className="car-path car-path--tire" />
              <circle cx="430" cy="225" r="20" className="car-path car-path--rim" />
              <circle cx="430" cy="225" r="5" className="car-path car-path--hub" />
              <line x1="430" y1="208" x2="430" y2="215" className="car-detail car-detail--spoke" />
              <line x1="443" y1="215" x2="438" y2="220" className="car-detail car-detail--spoke" />
              <line x1="447" y1="225" x2="440" y2="225" className="car-detail car-detail--spoke" />
              <line x1="443" y1="235" x2="438" y2="230" className="car-detail car-detail--spoke" />
              <line x1="430" y1="242" x2="430" y2="235" className="car-detail car-detail--spoke" />
              <line x1="417" y1="235" x2="422" y2="230" className="car-detail car-detail--spoke" />
              <line x1="413" y1="225" x2="420" y2="225" className="car-detail car-detail--spoke" />
              <line x1="417" y1="215" x2="422" y2="220" className="car-detail car-detail--spoke" />
            </g>

            {/* Engine / Hood */}
            <g className="car-part car-part--engine">
              <path d="M100 175 L160 175 L180 145 L188 138 Q190 136 195 135 L200 135 L200 140 L192 142 L175 170 L100 170 Z" className="car-path car-path--hood" />
              <rect x="110" y="155" width="40" height="12" rx="2" className="car-path car-path--engine-block" />
              <path d="M115 152 L140 152 L138 155 L117 155 Z" className="car-path car-path--intake" />
            </g>
          </svg>
        </div>

        {/* Right cards */}
        <div className="domain-cards domain-cards--right">
          {rightCards.map((card, i) => (
            <div key={i} className="domain-card">
              <span className="domain-card__icon">{ICONS[i + 2]}</span>
              <h3 className="domain-card__title">{card.title}</h3>
              <p className="domain-card__desc">{card.desc}</p>
              <div className="domain-card__tags">
                {TAGS[i + 2].map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="domain-connector domain-connector--left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
