import { useEffect, useRef } from 'react';

const AdSense = ({ client, slot, style }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const pushAd = () => {
      if (!window.adsbygoogle || !adRef.current) return;

      if (adRef.current.offsetWidth > 0 && !adRef.current.dataset.adsbygoogleDone) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adRef.current.dataset.adsbygoogleDone = 'true';
        } catch (e) {
          console.error('AdSense error', e);
        }
      } else if (adRef.current.offsetWidth === 0) {
        // Retry after 200ms if container width is still 0
        setTimeout(pushAd, 200);
      }
    };

    // Wait for the next paint
    requestAnimationFrame(pushAd);
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;
