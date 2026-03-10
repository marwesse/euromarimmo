import Script from 'next/script';
import { getSettings } from '@/app/actions/settings-actions';

export async function MarketingScripts() {
    const settings = await getSettings();

    const renderMetaPixel = settings?.meta_pixel_id && settings.meta_pixel_id.trim() !== "";
    const renderGoogleAnalytics = settings?.google_analytics_id && settings.google_analytics_id.trim() !== "";

    return (
        <>
            {/* Google Analytics */}
            {renderGoogleAnalytics && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${settings.google_analytics_id}');
                        `}
                    </Script>
                </>
            )}

            {/* Meta Pixel */}
            {renderMetaPixel && (
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${settings.meta_pixel_id}');
                        fbq('track', 'PageView');
                    `}
                </Script>
            )}
        </>
    );
}
