import '../styles/components/HeroLogo.css';

const HeroLogo = () => (
    <div className="hero-logo" id='hero-logo'>
        <svg className='logo-svg' version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter id="neonGlow" x="-50%" y="-50%" width="300%" height="300%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feComponentTransfer in="blur" result="brightness">
                        <feFuncA type="linear" slope="3" />
                    </feComponentTransfer>
                    <feBlend in="SourceGraphic" in2="brightness" mode="screen" />
                </filter>
            </defs>
            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" stroke="none">
                <path className='logo-blades' d="M255 495 c-29 -28 -32 -61 -9 -86 22 -24 64 -6 64 27 0 12 12 36 26 53 l26 31 -42 0 c-30 0 -47 -6 -65 -25" filter='url(#neonGlow)' />
                <path className='logo-blades' d="M179 461 c-21 -21 -29 -39 -29 -64 0 -59 65 -92 87 -44 9 18 7 28 -9 47 -13 16 -18 35 -16 57 2 18 2 33 0 33 -2 0 -17 -13 -33 -29" filter='url(#neonGlow)' />
                <path className='logo-blades' d="M347 472 c-24 -26 -21 -57 6 -69 18 -9 28 -7 47 9 16 13 35 18 56 16 28 -3 31 -2 23 14 -25 47 -101 64 -132 30" filter='url(#neonGlow)' />
                <path className='logo-blades' d="M408 394 c-22 -23 -4 -64 28 -64 12 0 36 -12 53 -26 l31 -26 0 42 c0 70 -70 116 -112 74" filter='url(#neonGlow)' />
                <path className='hero-logo-center' d="M272 367 c-28 -30 -28 -68 1 -95 30 -28 68 -28 95 1 28 30 28 68 -1 95 -30 28 -68 28 -95 -1" filter='url(#neonGlow)' />
                <path className='logo-blades' d="M120 320 c0 -70 66 -115 111 -74 24 22 6 64 -27 64 -12 0 -36 12 -53 26 l-31 26 0 -42" filter='url(#neonGlow)' />
                <path className='logo-blades' d="M403 287 c-9 -18 -7 -28 9 -47 13 -16 18 -35 16 -56 -3 -28 -2 -31 14 -23 27 15 48 51 48 85 0 56 -66 88 -87 41" filter='url(#neonGlow)' />
                <path className='logo-blades' d="M240 228 c-16 -13 -35 -18 -56 -16 -28 3 -31 2 -23 -14 15 -27 51 -48 85 -48 56 0 88 66 41 87 -18 9 -28 7 -47 -9" filter='url(#neonGlow)' />
                <path className='logo-blades' d="M353 237 c-14 -6 -23 -19 -23 -33 0 -12 -12 -36 -26 -53 l-26 -31 42 0 c71 0 118 73 73 112 -14 12 -23 13 -40 5" filter='url(#neonGlow)' />
            </g>
        </svg>
    </div>
);

export default HeroLogo;