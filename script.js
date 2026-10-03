const universe = document.querySelector(".universe");
const backgroundStars = document.querySelector(".background-stars");
const galaxyLayer = document.querySelector(".galaxy-layer");

const numberOfParticles = 500;
const particles = [];

const numberOfBackgroundStars = 180;


/* =================================
   BACKGROUND STARS
================================= */

for (let i = 0; i < numberOfBackgroundStars; i++) {

    const star = document.createElement("div");

    star.classList.add("background-star");

    const size = Math.random() < 0.9 ? 1 : 2;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.opacity =
        0.15 + Math.random() * 0.3;

    backgroundStars.appendChild(star);
}


/* =================================
   GALAXY PARTICLES
================================= */

for (let i = 0; i < numberOfParticles; i++) {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    if (Math.random() < 0.18) {
        particle.classList.add("glow");
    }

    if (Math.random() < 0.35) {
        particle.classList.add("small");
    }


    /* Birth position */

    const birthAngle =
        Math.random() * Math.PI * 2;

    const birthDistance =
        40 + Math.random() * 360;

    const birthX =
        Math.cos(birthAngle) *
        birthDistance;

    const birthY =
        Math.sin(birthAngle) *
        birthDistance;


    particle.style.setProperty(
        "--x",
        `${birthX}px`
    );

    particle.style.setProperty(
        "--y",
        `${birthY}px`
    );


    /* Galaxy position */

    let radius;

    if (i < 100) {

        radius =
            10 + Math.random() * 120;

    } else {

        radius =
            70 +
            Math.pow(Math.random(), 1.3) *
            300;
    }


    const arm = i % 3;


    const spiralAngle =
        (radius / 370) *
        Math.PI *
        3.5

        +

        arm *
        (Math.PI * 2 / 3)

        +

        (Math.random() - 0.5) *
        0.65;


    const galaxyX =
        Math.cos(spiralAngle) *
        radius;

    const galaxyY =
        Math.sin(spiralAngle) *
        radius *
        0.55;


    galaxyLayer.appendChild(
        particle
    );


    particles.push({

        element: particle,

        birthX,
        birthY,

        galaxyX,
        galaxyY,

        radius,
        angle: spiralAngle
    });
}


/* =================================
   GALAXY FORMATION
================================= */

setTimeout(() => {

    universe.classList.add(
        "galaxy-mode"
    );


    const startTime =
        performance.now();


    const rotationSpeed =
        0.00018;


    function animate(time) {

        const elapsed =
            time - startTime;


        const formationProgress =
            Math.min(
                elapsed / 4000,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - formationProgress,
                3
            );


        let rotationAngle = 0;


        if (formationProgress >= 1) {

            rotationAngle =
                (elapsed - 4000) *
                rotationSpeed;
        }


        const cosRotation =
            Math.cos(rotationAngle);

        const sinRotation =
            Math.sin(rotationAngle);


        particles.forEach((star) => {

            let x;
            let y;


            /* Galaxy formation */

            if (formationProgress < 1) {

                x =
                    star.birthX +
                    (
                        star.galaxyX -
                        star.birthX
                    ) *
                    eased;

                y =
                    star.birthY +
                    (
                        star.galaxyY -
                        star.birthY
                    ) *
                    eased;

            }


            /* Galaxy rotation */

            else {

                x =
                    star.galaxyX *
                    cosRotation

                    -

                    star.galaxyY *
                    sinRotation;


                y =
                    star.galaxyX *
                    sinRotation

                    +

                    star.galaxyY *
                    cosRotation;
            }


            star.element.style.transform =
                `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1)`;
        });


        requestAnimationFrame(
            animate
        );
    }


    requestAnimationFrame(
        animate
    );


    /* =================================
       BACKGROUND STARS APPEAR
    ================================= */

    setTimeout(() => {

        backgroundStars.classList.add(
            "visible"
        );

    }, 5000);


    /* =================================
       GALAXY MOVES FAR AWAY
    ================================= */

    setTimeout(() => {

        galaxyLayer.classList.add(
            "distant"
        );


        setTimeout(() => {

            /* Cosmic fog */

            document
                .querySelector(".cosmic-fog")
                .classList.add(
                    "visible"
                );


            /* Planets */

            setTimeout(() => {

                createPlanets();

            }, 5500);

        }, 7000);

    }, 6500);

}, 12000);


/* =================================
   CREATE PLANETS
================================= */

function createPlanets() {

    const planetsContainer =
        document.querySelector(".planets");


    const planetData = [

        {
            size: 9,
            left: 16,
            top: 27,
            opacity: 0.65,
            type: "blue"
        },

        {
            size: 14,
            left: 32,
            top: 68,
            opacity: 0.58,
            type: "purple"
        },

        {
            size: 8,
            left: 52,
            top: 20,
            opacity: 0.52,
            type: "cold"
        },

        /* =================================
           SATURN
        ================================= */

        {
            size: 19,
            left: 73,
            top: 34,
            opacity: 0.68,
            type: "blue",
            ring: true
        },

        {
            size: 11,
            left: 88,
            top: 69,
            opacity: 0.55,
            type: "purple"
        },

        {
            size: 22,
            left: 63,
            top: 80,
            opacity: 0.62,
            type: "cold"
        },

        {
            size: 7,
            left: 10,
            top: 77,
            opacity: 0.48,
            type: "blue"
        }
    ];


    planetData.forEach((data) => {

        const planet =
            document.createElement("div");


        planet.classList.add(
            "planet",
            data.type
        );


        planet.style.width =
            `${data.size}px`;

        planet.style.height =
            `${data.size}px`;

        planet.style.left =
            `${data.left}%`;

        planet.style.top =
            `${data.top}%`;


        planet.style.setProperty(
            "--planet-opacity",
            data.opacity
        );


        /* =================================
           SATURN RING
           
           The ring is created as a
           separate element so it can
           sit around the planet.
           
           NO ROTATION IS APPLIED HERE.
        ================================= */

        if (data.ring) {

            const ring =
                document.createElement("div");


            ring.classList.add(
                "planet-ring"
            );


            planet.appendChild(
                ring
            );
        }


        planetsContainer.appendChild(
            planet
        );
    });


    /* =================================
       PLANET REVEAL
    ================================= */

    const planets =
        planetsContainer.querySelectorAll(
            ".planet"
        );


    planets.forEach((planet, index) => {

        setTimeout(() => {

            planet.classList.add(
                "visible"
            );

        }, index * 1800);

    });


    /* =================================
       MOON
    ================================= */

    setTimeout(() => {

        const moon =
            document.querySelector(
                ".moon"
            );


        moon.classList.add(
            "visible"
        );

    }, 7 * 1800 + 2500);
}


