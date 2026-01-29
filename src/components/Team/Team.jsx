import { useEffect, useState } from "react";
import "./Team.css";

const Team = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch("/data/team.json")
            .then(res => res.json())
            .then(json => setTeam(json.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="team" className="team-section">
            <h2 className="team-title">Il nostro team</h2>

            <div className="team-grid">
                {team.map((member, index) => (
                    <div className="team-card" key={index}>
                        <div className="team-image-wrapper">
                            <img src={member.photo} alt={member.name} />
                        </div>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
