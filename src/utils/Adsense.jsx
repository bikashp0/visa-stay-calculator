import { useEffect, useRef } from 'react';

const AdSense = ({ client, slot, style }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const tryPush = () => {
      if (!window.adsbygoogle || !adRef.current) return;

      // Only push if container has width
      if (adRef.current.offsetWidth > 0 && !adRef.current.dataset.adsbygoogleDone) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adRef.current.dataset.adsbygoogleDone = 'true';
        } catch (e) {
          console.error('AdSense error', e);
        }
      } else {
        // Retry after 300ms if width is still 0
        setTimeout(tryPush, 300);
      }
    };

    const id = requestAnimationFrame(tryPush);
    return () => cancelAnimationFrame(id);
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
