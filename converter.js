
$(document).ready(function (){

    // User chooses a 'Base'
    $('#chosenbase input').on('change', function() {
        let basetype = $('input[name=base]:checked', '#chosenbase').val()        // 'binary' or 'decimal'


        if(basetype == "binary")
        {
            $("#explabel").text('x2 raised to')
        }

        if(basetype == "decimal")
        {
            $("#explabel").text('x10 raised to')
        }

        $("#input").val('') // Clears values
        $("#exp").val('')  // Clears values
        $("#result").text('0') // Clears values
        $("#hexresult").text('0')  // Clears values

      });


    // User presses "CONVERT"
    $('#convert').on('click', function (e){
        let inputval = parseFloat($("#input").val())    // Input number
        let expval = parseInt($("#exp").val())          // Input exponent
        let basetype = $('input[name=base]:checked', '#chosenbase').val()        // Input base : 'binary' or 'decimal'
        let IEEE754 = new Array(32).fill(0)        //Initial IEEE-754 Binary-32 floating point representation
        let hex = new Array(8).fill(0)             //Initial hexadecimal
        let ePrime = 0                             //Initial e'
        let value = 0

        // Insert convertion stuffs here then store value in "resultval" and "hexval"
        if(basetype == "decimal")
        {
            // Converting Decimal (Base-10) to IEEE-754
        }
        else
        {
            // Converting Binary (Base-2) to IEEE-754
            //Normalizing significand
            while ((inputval > -1 && inputval < 1) || inputval >= 2 || inputval <= -2){
                if (inputval >= 2 || inputval <= -2){
                    inputval = inputval / 10
                    expval++
                }
                else{
                    inputval = inputval * 10
                    expval--
                }
            }
            //If input is negative, set the sign bit to 1
            if(inputval < 0){
                IEEE754[0] = 1
            }
            //e' = e + 127
            ePrime = 127 + expval
            let binary = 128
            let index = 1
            //Converting e' to binary
            while (ePrime > 0){
                if(ePrime >= binary){
                    ePrime -= binary
                    IEEE754[index] = 1
                }
                binary = binary / 2
                index++
            }
            //Copying fraction part of significand to the last 23 bits
            for (let i = 0; i < 23; i++) {
                inputval = inputval * 10
                if ((Math.trunc(inputval) % 10) > 1 || (Math.trunc(inputval) % 10) == 0){
                    IEEE754[i + 9] = 0
                }
                else{
                    IEEE754[i + 9] = 1
                }
            }
            //Converting the IEEE-754 Binary-32 floating point representation to hexadecimal
            for (let i = 0; i < 8; i++) {
                index = i * 4
                value = 8
                for (let j = 0; j < 4; j++){
                    if(IEEE754[index + j] == 1){
                        hex[i] += value
                    }
                    value = value / 2
                }
                if(hex[i] >= 10){
                    switch(hex[i]){
                        case 10:
                            hex[i] = "A"
                            break
                        case 11:
                            hex[i] = "B"
                            break
                        case 12:
                            hex[i] = "C"
                            break
                        case 13:
                            hex[i] = "D"
                            break
                        case 14:
                            hex[i] = "E"
                            break
                        case 15:
                            hex[i] = "F"
                    }
                }
            }
        }
        //Adding spaces between sections of the IEEE-754 Binary-32 floating point representation
        let resultval = IEEE754[0] + " " + IEEE754.slice(1, 9).join("") + " " + IEEE754.slice(9, 32).join("")
        let hexval = hex.join("")

        // Prints resultval in webapp
        let resulttext = $(document.getElementById("result"))
        let hextext = $(document.getElementById("hexresult"))
        resulttext.text(resultval) 
        hextext.text(hexval) 

    });


    // User presses "SAVE AS TEXT FILE"
    $('#save').on('click', function (e){





    });

    // Prevents invalid 'input'
    $( "#input" ).on( "keydown", function(e) 
    {
        let basetype = $('input[name=base]:checked', '#chosenbase').val()        // 'binary' or 'decimal'
        if(basetype == "binary")
        {
            return e.keyCode == 49 || e.keyCode == 48 || e.keyCode == 8 || e.keyCode == 190
        }
    }).trigger( "keyup" );

    // Prevents invalid 'exp'
    $( "#exp" ).on( "keydown", function(e) 
    {
        

    })

});