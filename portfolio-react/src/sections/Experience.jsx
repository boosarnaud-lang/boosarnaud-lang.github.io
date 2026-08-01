import './Experience.css';

export default function Experience() {
  const timeline = [
    {
      title: 'Full Stack Engineer & Data Manager',
      company: 'Catdata',
      period: 'Jul 2012–Present',
      skills: [
        'Full Stack Dev',
        'Automotive Data',
        'VIN/Plate',
        'OEM & IAM',
        'TecAlliance',
        'Project Management',
        'Reverse Engineering',
        'AI Agents',
      ],
    },
    {
      title: 'Director',
      company: 'Catdata',
      period: 'Jun 2017–Apr 2022',
      skills: [],
    },
    {
      title: 'IT Technician Intern',
      company: 'Catdata',
      period: 'Apr–Jun 2012',
      skills: [],
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience__blob experience__blob--1" />
      <div className="experience__blob experience__blob--2" />
      <div className="experience__blob experience__blob--3" />

      <div className="experience__content">
        <h2 className="experience__title">Experience</h2>

        <div className="experience__timeline">
          {timeline.map((item, index) => (
            <div key={index} className="experience__item">
              <div className="experience__dot" />
              <div className="experience__details">
                <h3 className="experience__role">{item.title}</h3>
                <p className="experience__company">
                  {item.company} · {item.period}
                </p>
                {item.skills.length > 0 && (
                  <div className="experience__skills">
                    {item.skills.map((skill) => (
                      <span key={skill} className="experience__skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
