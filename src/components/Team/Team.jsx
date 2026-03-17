import { useEffect, useState } from "react";
import "./Team.css";
import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";

const Team = () => {
    const [team, setTeam] = useState([]);
    const fadeRef = useFadeInOnScroll();

    useEffect(() => {
        fetch("/data/team.json")
            .then(res => res.json())
            .then(json => setTeam(json.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="team" className="team-section fade-in-section" ref={fadeRef}>
            <h2 className="team-title">Il nostro team</h2>

            <div className="team-grid">
                {team.map((member, index) => (
                    <div
                        className={`team-card ${index % 2 === 0 ? "offset" : ""}`}
                        key={index}
                    >
                        <div className="team-image-wrapper">
                            <img src={member.photo} alt={member.name} />

                            <div className="team-overlay">
                                <h3>{member.role}</h3>
                                <p>{member.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;

// import { useEffect, useState } from "react";
// import "./Team.css";
// import useFadeInOnScroll from "../../hooks/useFadeInOnScroll.jsx";
//
// const Team = () => {
//     const [team, setTeam] = useState([]);
//     const fadeRef = useFadeInOnScroll();
//
//     useEffect(() => {
//         fetch("/data/team.json")
//             .then(res => res.json())
//             .then(json => setTeam(json.data))
//             .catch(err => console.error(err));
//     }, []);
//
//     return (
//         <section id="team" className="team-section fade-in-section" ref={fadeRef}>
//             <h2 className="team-title">Il nostro team</h2>
//
//             <div className="team-grid">
//                 {team.map((member, index) => (
//                     <div className="team-card" key={index}>
//                         <div className="team-image-wrapper">
//                             <img src={member.photo} alt={member.name} />
//                         </div>
//                         <h3>{member.name}</h3>
//                         <p>{member.role}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };
//
// export default Team;
