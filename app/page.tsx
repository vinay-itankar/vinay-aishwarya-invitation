"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetUrl(path: string) {
  return `${basePath}${path}`;
}

const events = [
  {
    title: "Haldi & Sangeet",
    date: "27th November 2026",
    description: "A joyful celebration filled with music, dance, colours and blessings.",
    times: ["Sangeet · 6:30 PM onwards", "Haldi · 10:00 PM onwards"],
    venue: "Mahajan Palace, Godhani Road, Gayatri Nagar, Zingabai Takli, Nagpur, Maharashtra 440030",
    images: [
      { src: "/vinay-aishwarya/sangeet.webp", alt: "Vinay and Aishwarya celebrating Sangeet" },
      { src: "/vinay-aishwarya/haldi.webp", alt: "Vinay and Aishwarya celebrating Haldi" },
    ],
  },
  {
    title: "The Wedding",
    date: "29th November 2026",
    description: "Join us as we begin our forever, surrounded by family and friends.",
    times: ["Ceremony · 10:21 AM"],
    venue: "Ramdevbaba Mangalam, Lawn and Mangal Karyalaya, Warud, Amravati, Maharashtra 444906",
    images: [
      { src: "/vinay-aishwarya/wedding.webp", alt: "Vinay and Aishwarya in their wedding attire" },
    ],
  },
  {
    title: "Reception",
    date: "30th November 2026",
    description: "Celebrate, dine and make memories with the newlyweds.",
    times: ["6:30 PM onwards"],
    venue: "Rathor Garden Lawn, Mankapur Ring Road, near Ayyappa Temple, New Mankapur, Nagpur, Maharashtra 440013",
    images: [
      { src: "/vinay-aishwarya/reception.webp", alt: "Vinay and Aishwarya at their reception" },
    ],
  },
];

const gallery = [
  { src: "haldi.webp", alt: "Vinay and Aishwarya celebrating Haldi" },
  { src: "mehendi.webp", alt: "Vinay and Aishwarya celebrating Mehendi" },
  { src: "sangeet.webp", alt: "Vinay and Aishwarya celebrating Sangeet" },
  { src: "wedding.webp", alt: "Vinay and Aishwarya dressed for their wedding" },
  { src: "reception.webp", alt: "Vinay and Aishwarya dressed for their reception" },
];

function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default function VinayAishwaryaInvitation() {
  const [opened, setOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const invitationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const invitation = invitationRef.current;
    if (!opened || !invitation || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const textElements = invitation.querySelectorAll<HTMLElement>("h1, h2, h3, p, a");
    const sectionOrders = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.visible = "true";
          observer.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    textElements.forEach((element) => {
      const section = element.closest("section, footer") ?? invitation;
      const order = sectionOrders.get(section) ?? 0;
      sectionOrders.set(section, order + 1);
      element.classList.add(styles.textReveal);
      element.style.setProperty("--reveal-delay", `${Math.min(order, 7) * 75}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [opened]);

  function openInvitation() {
    if (isOpening) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpened(true);
      return;
    }
    setIsOpening(true);
    window.setTimeout(() => setOpened(true), 950);
  }

  if (!opened) {
    return (
      <main className={styles.cover}>
        <Image
          className={styles.coverBackground}
          src={assetUrl("/vinay-aishwarya/cover-bg.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.coverShade} />
        <div className={`${styles.coverContent} ${isOpening ? styles.coverOpening : ""}`}>
          <p className={styles.eyebrow}>You are warmly invited for</p>
          <h1 className={styles.coverNames}>Vinay <span>&</span> Aishwarya</h1>
          <p className={styles.eyebrow}>Wedding on</p>
          <p className={styles.coverDate}>29th November 2026</p>
          <div className={styles.coverScene}>
            <span className={`${styles.coverSparkle} ${styles.coverSparkleOne}`} aria-hidden="true" />
            <span className={`${styles.coverSparkle} ${styles.coverSparkleTwo}`} aria-hidden="true" />
            <span className={`${styles.coverSparkle} ${styles.coverSparkleThree}`} aria-hidden="true" />
            <Image
              className={styles.coverCouple}
              src={assetUrl("/vinay-aishwarya/cover-couple.webp")}
              alt="Illustration of Vinay and Aishwarya in their wedding attire"
              width={768}
              height={960}
              priority
              sizes="(max-width: 700px) 85vw, 480px"
            />
          </div>
          <button className={styles.openButton} onClick={openInvitation} disabled={isOpening}>
            <span className={styles.openIcon} aria-hidden="true">✦</span>
            {isOpening ? "Opening invitation" : "Tap to Open"}
          </button>
          <p className={styles.coverHint}>A celebration of love, family & forever</p>
        </div>
      </main>
    );
  }

  return (
    <main ref={invitationRef} className={styles.invitation}>
      <section className={styles.hero} aria-labelledby="invitation-title">
        <Image
          className={styles.heroBackground}
          src={assetUrl("/vinay-aishwarya/cover-bg.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>The Wedding Of</p>
          <h1 id="invitation-title" className={styles.heroNames}>
            <span>Vinay Itankar</span>
            <span className={styles.heroHeart} aria-hidden="true">♥</span>
            <span>Aishwarya Likhitkar</span>
          </h1>
          <p className={styles.heroSubline}>Together with our families</p>
          <p className={styles.heroDate}>29th November 2026 <span>·</span> 10:21 AM</p>
          <p className={styles.hashtag}>#AishVinni</p>
          <a className={styles.scrollLink} href="#celebrations">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className={styles.heroCoupleScene} aria-label="A wedding portrait of Vinay and Aishwarya">
        <Image
          className={styles.heroCoupleBackground}
          src={assetUrl("/vinay-aishwarya/cover-bg.webp")}
          alt=""
          fill
          sizes="100vw"
        />
        <Image
          className={styles.heroCoupleImage}
          src={assetUrl("/vinay-aishwarya/cover-couple.webp")}
          alt="Vinay and Aishwarya in their wedding attire"
          width={768}
          height={960}
          sizes="(max-width: 700px) 92vw, 620px"
        />
      </section>

      <section className={styles.coupleSection} aria-labelledby="couple-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Meet the Couple</p>
          <h2 id="couple-title">The Bride &amp; The Groom</h2>
          <p>Two families, two hearts and one beautiful beginning — we can’t wait to celebrate with you.</p>
        </div>
        <div className={styles.coupleGrid}>
          <article className={styles.personCard}>
            <Image className={styles.personImage} src={assetUrl("/vinay-aishwarya/groom-vinay.webp")} alt="Vinay Itankar, the groom" width={1024} height={1024} sizes="(max-width: 700px) 58vw, 280px" />
            <p className={styles.role}>The Groom</p>
            <h3>Vinay Itankar</h3>
            <div className={styles.personDivider} aria-hidden="true"><span>♥</span></div>
            <p className={styles.parents}>Son of Mr. Purushottam Itankar &amp; Mrs. Vandana Itankar</p>
          </article>
          <div className={styles.coupleFlourish} aria-hidden="true"><span>♡</span></div>
          <article className={styles.personCard}>
            <Image className={styles.personImage} src={assetUrl("/vinay-aishwarya/bride.webp")} alt="Aishwarya Likhitkar, the bride" width={1122} height={1402} sizes="(max-width: 700px) 58vw, 280px" />
            <p className={styles.role}>The Bride</p>
            <h3>Aishwarya Likhitkar</h3>
            <div className={styles.personDivider} aria-hidden="true"><span>♥</span></div>
            <p className={styles.parents}>Daughter of Dr. Chandrashekhar Likhitkar &amp; Mrs. Priti Likhitkar</p>
          </article>
        </div>
      </section>

      <section id="celebrations" className={styles.eventsSection} aria-labelledby="events-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Celebrations</p>
          <h2 id="events-title">Wedding Functions</h2>
          <p>We would be delighted to celebrate these special moments with you.</p>
        </div>
        <div className={styles.eventGrid}>
          {events.map((event) => (
            <article className={styles.eventCard} key={event.title}>
              <div
                className={`${styles.eventImages} ${event.images.length > 1 ? styles.eventImagesPair : ""}`}
              >
                {event.images.map((image, index) => (
                  <Image
                    className={`${styles.eventImage} ${event.images.length > 1 ? index === 0 ? styles.sangeetImage : styles.haldiImage : ""}`}
                    key={image.src}
                    src={assetUrl(image.src)}
                    alt={image.alt}
                    width={1024}
                    height={1280}
                    sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                ))}
              </div>
              <div className={styles.eventInfo}>
                <p className={styles.eventDate}><span className={styles.detailIcon} aria-hidden="true">▦</span>{event.date}</p>
                <h3>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
                <div className={styles.eventTimes}>
                  {event.times.map((time) => <p key={time}><span className={styles.detailIcon} aria-hidden="true">◷</span>{time}</p>)}
                </div>
                <p className={styles.eventVenue}><span className={styles.detailIcon} aria-hidden="true">⌖</span>{event.venue}</p>
                <a className={styles.directionLink} href={directionsUrl(event.venue)} target="_blank" rel="noreferrer">
                  Get directions <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gallerySection} aria-labelledby="gallery-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Moments</p>
          <h2 id="gallery-title">Our Photo Album</h2>
          <p className={styles.galleryCaption}>A few frames from the little celebrations that brought us here.</p>
        </div>
        <div className={styles.gallery}>
          {gallery.map((image) => (
            <Image
              className={styles.galleryImage}
              key={image.src}
              src={assetUrl(`/vinay-aishwarya/${image.src}`)}
              alt={image.alt}
              width={768}
              height={960}
              sizes="(max-width: 700px) 46vw, (max-width: 1000px) 30vw, 16vw"
            />
          ))}
        </div>
      </section>

      <section className={styles.familySection} aria-labelledby="family-title">
        <p className={styles.eyebrow}>With blessings from</p>
        <h2 id="family-title">Our Families</h2>
        <p>Two families joining hands with love and gratitude.</p>
        <div className={styles.familyNames}>
          <p><strong>Mr. Purushottam Itankar &amp; Mrs. Vandana Itankar</strong><span>Vinay’s Family</span></p>
          <p><strong>Dr. Chandrashekhar Likhitkar &amp; Mrs. Priti Likhitkar</strong><span>Aishwarya’s Family</span></p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.eyebrow}>We can’t wait to celebrate with you</p>
        <h2>Vinay <span>&amp;</span> Aishwarya</h2>
        <p className={styles.hashtag}>#AishVinni</p>
        <a className={styles.backToTop} href="#invitation-title">Back to top ↑</a>
      </footer>
    </main>
  );
}
