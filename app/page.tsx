import { siteConfig } from "./site-config";

export default function Home() {
  const { brand, contacts, location, hours } = siteConfig;

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="bubble-field" aria-hidden="true">
        {Array.from({ length: 13 }).map((_, index) => (
          <span className={`bubble bubble-${index + 1}`} key={index} />
        ))}
      </div>
      <div className="fish-field" aria-hidden="true">
        <span className="fish fish-1">≈›</span>
        <span className="fish fish-2">≈›</span>
        <span className="fish fish-3">≈›</span>
        <span className="fish fish-4">≈›</span>
      </div>

      <article className="profile-card">
        <header className="hero">
          <div className="brand-mark" aria-label={brand.logoAlt}>
            {brand.logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logoSrc} alt={brand.logoAlt} />
            ) : (
              <div className="monogram" aria-hidden="true">
                <span className="monogram-fish">≈</span>
                <span>AT</span>
                <span className="monogram-leaf">❧</span>
              </div>
            )}
          </div>

          <p className="eyebrow">
            <span aria-hidden="true">≋</span>
            {brand.eyebrow}
          </p>
          <h1>{brand.name}</h1>
          <p className="description">{brand.description}</p>

          <ul className="category-list" aria-label="Наш ассортимент">
            <li>Рыбки</li>
            <li>Растения</li>
            <li>Аквариумы</li>
            <li>Аксессуары</li>
          </ul>
        </header>

        <section className="actions" aria-label="Связаться с магазином">
          <div className="telegram-list">
            {contacts.telegrams.map((telegram) => (
              <a
                className="action-button action-primary"
                href={telegram.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Написать ${telegram.name} в Telegram ${telegram.display}`}
                key={telegram.display}
              >
                <span className="action-icon">
                  <span className="symbol" aria-hidden="true">↗</span>
                </span>
                <span className="action-copy">
                  <small>{telegram.display}</small>
                  <span>
                    <span className="telegram-action-label">Написать — </span>
                    {telegram.name}
                  </span>
                </span>
                <span className="arrow-icon" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <div className="action-row">
            {contacts.phones.map((phone) => (
              <a
                className="action-button action-secondary"
                href={`tel:${phone.href}`}
                aria-label={`Позвонить по номеру ${phone.display}`}
                key={phone.href}
              >
                <span className="symbol" aria-hidden="true">☎</span>
                <span className="action-mini-copy">
                  <strong>Позвонить</strong>
                  <small>{phone.display}</small>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="details" aria-label="Адрес и часы работы">
          <div className="detail-block address-block">
            <div className="detail-heading">
              <span className="detail-icon">
                <span className="symbol" aria-hidden="true">⌖</span>
              </span>
              <div>
                <p className="detail-label">Наш магазин</p>
                <h2>Ждём вас в гости</h2>
              </div>
            </div>
            <p className="address">{location.address}</p>
            <details className="map-chooser">
              <summary className="map-link">
                Показать на карте
                <span className="arrow-icon" aria-hidden="true">＋</span>
              </summary>
              <div className="map-options" aria-label="Выберите приложение с картами">
                {location.mapLinks.map((map) => (
                  <a
                    className="map-option"
                    href={map.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Открыть адрес в ${map.name}`}
                    key={map.name}
                  >
                    <span className="map-option-badge" aria-hidden="true">
                      {map.shortName.slice(0, 1)}
                    </span>
                    <span>{map.shortName}</span>
                    <span className="map-option-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </details>
          </div>

          <div className="detail-divider" aria-hidden="true" />

          <div className="detail-block hours-block">
            <div className="detail-heading">
              <span className="detail-icon">
                <span className="symbol" aria-hidden="true">◷</span>
              </span>
              <div>
                <p className="detail-label">Часы работы</p>
                <h2>Открыты каждый день</h2>
              </div>
            </div>
            <div className="schedule">
              {hours.map((item) => (
                <div className="schedule-row" key={item.days}>
                  <span>{item.days}</span>
                  <strong>{item.time}</strong>
                </div>
              ))}
            </div>
            <div className="channel-divider" aria-hidden="true" />
            <a
              className="channel-link"
              href={contacts.channel.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Открыть Telegram-канал ${contacts.channel.display}`}
            >
              <span className="channel-icon" aria-hidden="true">↗</span>
              <span className="channel-copy">
                <small>Наш Telegram-канал</small>
                <strong>{contacts.channel.display}</strong>
              </span>
              <span className="channel-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <footer>
          <span className="footer-dot" aria-hidden="true" />
          Красота подводного мира начинается здесь
        </footer>
      </article>
    </main>
  );
}
