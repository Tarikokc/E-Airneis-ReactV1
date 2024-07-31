import React from 'react';
import '../css/about.css';

const About = () => {
    return (
        <div className="about">

            <section className="story">
                <h2>Notre Histoire</h2>
                <p>
                    ÀIRNEIS est né d'une passion pour le design scandinave et d'un amour pour les matériaux nobles. Fondée en 2010 par Jeanne et Pierre Lefèvre, un couple de designers français, l'entreprise s'est donné pour mission de créer des meubles intemporels, alliant simplicité, fonctionnalité et élégance. Inspirés par les paysages époustouflants et la richesse culturelle de la Scandinavie, ils ont décidé de donner vie à leur vision en utilisant du bois d'Écosse, connu pour sa robustesse et sa beauté naturelle.
                </p>
            </section>

            <section className="mission">
                <h2>Notre Mission</h2>
                <p>
                    Chez ÀIRNEIS, nous croyons que chaque meuble doit raconter une histoire. C'est pourquoi nous travaillons en étroite collaboration avec des artisans écossais pour sélectionner les meilleurs bois et garantir une qualité exceptionnelle. Notre mission est de créer des pièces uniques qui non seulement embellissent votre intérieur, mais qui respectent aussi l'environnement. Nous nous engageons à utiliser des pratiques durables et à minimiser notre empreinte écologique à chaque étape de notre processus de fabrication.
                </p>
            </section>

            <section className="values">
                <h2>Nos Valeurs</h2>
                <ul>
                    <li>
                        <strong>Durabilité :</strong> Nous utilisons des matériaux durables et des techniques de fabrication respectueuses de l'environnement.
                    </li>
                    <li>
                        <strong>Qualité :</strong> Chaque meuble est conçu pour durer, avec une attention méticuleuse aux détails et à la finition.
                    </li>
                    <li>
                        <strong>Design :</strong> Nous allions esthétique et fonctionnalité pour créer des meubles à la fois beaux et pratiques.
                    </li>
                    <li>
                        <strong>Éthique :</strong> Nous travaillons de manière transparente et éthique avec nos fournisseurs et nos clients.
                    </li>
                </ul>
            </section>

            <section className="team">
                <h2>Notre Équipe</h2>
                <p>
                    L'équipe ÀIRNEIS est composée de designers talentueux, d'artisans qualifiés et de passionnés de décoration intérieure. Chacun de nous partage la même vision : créer des meubles qui inspirent et qui apportent du confort dans chaque maison. Nous sommes fiers de notre travail et de la relation de confiance que nous avons bâtie avec nos clients au fil des années.
                </p>
            </section>

            <section className="commitment">
                <h2>Notre Engagement</h2>
                <p>
                    Nous nous engageons à offrir un service client exceptionnel, de la commande à la livraison. Votre satisfaction est notre priorité. Nous sommes là pour vous aider à trouver les pièces parfaites pour votre intérieur et à répondre à toutes vos questions. Chez ÀIRNEIS, chaque client est traité comme un membre de notre famille.
                </p>
            </section>
        </div>
    );
};

export default About;
