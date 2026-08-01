import './Skills.css';

export default function Skills() {
  const groups = [
    {
      title: 'Languages',
      items: ['TypeScript', 'Go', 'PHP', 'SQL'],
    },
    {
      title: 'Frameworks & Tools',
      items: ['React', 'Node.js', 'Docker', 'Git', 'REST APIs'],
    },
    {
      title: 'Domain',
      items: [
        'Automotive Data',
        'VIN/Plate Identification',
        'TecAlliance',
        'OEM & IAM Catalogs',
      ],
    },
    {
      title: 'Other',
      items: [
        'AI Agents',
        'Data Management',
        'Reverse Engineering',
        'Project Management',
      ],
    },
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills__bubble skills__bubble--1" />
      <div className="skills__bubble skills__bubble--2" />
      <div className="skills__bubble skills__bubble--3" />
      <div className="skills__bubble skills__bubble--4" />
      <div className="skills__bubble skills__bubble--5" />

      <div className="skills__content">
        <h2 className="skills__title">Skills</h2>

        <div className="skills__grid">
          {groups.map((group) => (
            <div key={group.title} className="skills__card">
              <h3 className="skills__card-title">{group.title}</h3>
              <ul className="skills__list">
                {group.items.map((item) => (
                  <li key={item} className="skills__list-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
