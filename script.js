/* =========================================================
   VERAÉ INTERACTION ENGINE
========================================================= */


/* =========================================================
   CREATE RAIN
========================================================= */

const rainContainer = document.getElementById("rain");

const rainAmount =
    window.innerWidth < 600 ? 55 : 110;

for (let i = 0; i < rainAmount; i++) {

    const drop = document.createElement("span");

    drop.className = "rain-drop";

    drop.style.left =
        Math.random() * 100 + "%";

    drop.style.height =
        (20 + Math.random() * 55) + "px";

    drop.style.opacity =
        0.15 + Math.random() * 0.35;

    drop.style.animationDuration =
        (0.8 + Math.random() * 1.7) + "s";

    drop.style.animationDelay =
        (-Math.random() * 4) + "s";

    rainContainer.appendChild(drop);
}



/* =========================================================
   CREATE FLOATING DROPLETS
========================================================= */

const dropletsContainer =
    document.getElementById("droplets");

const dropletAmount =
    window.innerWidth < 600 ? 15 : 30;

for (let i = 0; i < dropletAmount; i++) {

    const droplet =
        document.createElement("span");

    droplet.className = "droplet";

    droplet.style.left =
        Math.random() * 100 + "%";

    droplet.style.top =
        Math.random() * 100 + "%";

    droplet.style.transform =
        `scale(${0.5 + Math.random()})`;

    droplet.style.animationDuration =
        (5 + Math.random() * 7) + "s";

    droplet.style.animationDelay =
        (-Math.random() * 6) + "s";

    dropletsContainer.appendChild(droplet);
}



/* =========================================================
   CURSOR LIGHT
========================================================= */

const cursorGlow =
    document.getElementById("cursorGlow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});



/* =========================================================
   PRODUCT PARALLAX
========================================================= */

const cards =
    document.querySelectorAll(".product-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            (y - centerY) / 30;

        const rotateY =
            (centerX - x) / 30;

        const product =
            card.querySelector(".mini-product");

        if (product) {

            product.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        }

    });


    card.addEventListener("mouseleave", () => {

        const product =
            card.querySelector(".mini-product");

        if (product) {

            product.style.transform =
                "";

        }

    });

});



/* =========================================================
   ADD TO BAG
========================================================= */

let bagCount = 0;

const bagCounter =
    document.getElementById("bagCount");

const addButtons =
    document.querySelectorAll(".add-button");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        bagCount++;

        bagCounter.textContent =
            bagCount;

        button.textContent =
            "Added ✓";

        setTimeout(() => {

            button.textContent =
                "Add to ritual +";

        }, 1400);

    });

});



/* =========================================================
   RIPPLE WHEN CLICKING
========================================================= */

document.addEventListener("click", (event) => {

    const ripple =
        document.createElement("span");

    ripple.style.position =
        "fixed";

    ripple.style.left =
        event.clientX + "px";

    ripple.style.top =
        event.clientY + "px";

    ripple.style.width =
        "10px";

    ripple.style.height =
        "10px";

    ripple.style.border =
        "1px solid rgba(120,180,170,.4)";

    ripple.style.borderRadius =
        "50%";

    ripple.style.pointerEvents =
        "none";

    ripple.style.zIndex =
        "200";

    ripple.style.transform =
        "translate(-50%,-50%)";

    ripple.style.animation =
        "clickRipple 1s ease-out forwards";

    document.body.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 1000);

});



/* =========================================================
   RIPPLE ANIMATION
========================================================= */

const rippleStyle =
    document.createElement("style");

rippleStyle.textContent = `

@keyframes clickRipple {

    from {

        width: 10px;
        height: 10px;

        opacity: .8;

    }

    to {

        width: 120px;
        height: 120px;

        opacity: 0;

    }

}

`;

document.head.appendChild(rippleStyle);



/* =========================================================
   HERO PRODUCT PARALLAX
========================================================= */

const heroProduct =
    document.querySelector(".hero-product");

document.addEventListener("mousemove", (event) => {

    if (!heroProduct) return;

    const x =
        (event.clientX / window.innerWidth - .5);

    const y =
        (event.clientY / window.innerHeight - .5);

    heroProduct.style.marginLeft =
        `${x * 15}px`;

    heroProduct.style.marginTop =
        `${y * 15}px`;

});



/* =========================================================
   INTERSECTION REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".product-card, .ingredient, .intro h2, .botanical-copy"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .15
        }
    );



revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});
