module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
        'freepik': "url('https://img.freepik.com/free-vector/mix-race-web-developers-creating-program-code-development-software-programming-concept-portrait-copy-space_48369-33953.jpg?w=1800')",
      },

      keyframes : {

        like:{
          '0%':{transform:'translateY(0%)',opacity:'1'},
          '50%':{transform:'translateY(-20%)',opacity:'1'},
          '100%':{transform:'translateY(-100%)',opacity:'0'}
        },

        loading : {

          "0%":{transform:'translateY(0%)'},
          '50%':{transform:'translateY(-50%)'},
          '100%':{transform:'translateY(0%)'}

        },

        modal : {

          '0%':{opacity:'0'},
          '100%':{opacity:'1'}
        }
      },
      animation : {

        'liking':'like 0.5s linear',
        'load':'loading 1s linear infinite',
        'modalopen': 'modal 0.4s linear',
        
      }
    },
  },
  plugins: [],
}
