/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,pug}"],
  theme: {
    colors : {
      white : '#FFFFFF',
      'royal-blue' : '#2405F2',
      'dark-blue' : '#282938',
      grey : '#F4F6FC',
      yellow : '#FCD980',
      'tint-blue' : '#1C1E53',
      accent : '#EEF4FA'
    },
    fontSize : {
      xs : '16px',
      sm : '18px',
      base : '24px',
      lg : '32px',
      xl : '36px',
      '2xl' : '38px',
      '3xl' : '48px',
      '4xl' : '54px'
    },
    backgroundImage : {
      'custom-bg' : "url('../images/custom-bg.png')",
      'opacity-bg' : "url('../images/bg-opacity.png')"
    },
    extend: {
      screens:{
        'max-md' :{max:  '768px'},
        'max-lg' : {max : '800px'},
        'max-xl' : {max:'852px'},
        'md-max-md': {min:'768px', max:'821px'}
      },
      flex : {
        "1" : ' 1 1 250px',
      },
      width: {
        'clamp': 'clamp(47%, 50vw, 53%)',
      },
      minHeight:{
        'clamp' : 'clamp(315px, 50vw, 630px)',
      },
      gridTemplateColumns: {
        'auto-fill-minmax-300': 'repeat(auto-fill, minmax(220px, 1fr))',
      },
      listStyleType: {
        square: 'square',
      },
      display: {
        'none': 'none',
      },
      backgroundColor:{
        'transparent' : 'transparent',
      }
    },
    variants: {
      display: ['responsive'], // Assurez-vous que vous avez configuré les variantes si vous utilisez les classes responsive
    },
  },
  plugins: [],
  corePlugins: {
    // Activer le layer 'base'
    preflight: false,
  },
}