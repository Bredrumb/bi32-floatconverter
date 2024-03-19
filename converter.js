
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

    let resulttext = $(document.getElementById("result"))
    let hextext = $(document.getElementById("hexresult"))
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
            //Check if input number is zero
            if (inputval != 0){
                //If input is negative, set the sign bit to 1
                if(inputval < 0){
                    IEEE754[0] = 1
                    inputval *= -1
                }

                //Make the exponent zero
                while (expval != 0){
                    if (expval > 0){
                        inputval = inputval * 10
                        expval--
                    }
                    else{
                        inputval = inputval / 10
                        expval++
                    }
                }
                let integerPart = Math.floor(inputval)
                let fractionPart = inputval - integerPart

                let integerBinary = 0
                let multiplier = 1
                //Convert integer part of decimal to binary
                while (integerPart > 0){
                    integerBinary += (integerPart % 2) * multiplier;
                    integerPart = Math.floor(integerPart / 2);
                    multiplier *= 10
                }
                let fractionBinary = 0;
                multiplier = 0.1
                //Convert fraction part of decimal to binary
                while (fractionPart != 0){
                    fractionPart *= 2;
                    if (fractionPart >= 1) {
                        fractionBinary += multiplier;
                        fractionPart -= 1;
                    } 
                    multiplier /= 10
                }
                //Assigning the equivalent binary float to inputval
                inputval = integerBinary + fractionBinary
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
                //If input is infinity
                if (expval > 127){
                    for (let i = 1; i < 9; i++){
                        IEEE754[i] = 1
                    }
                }
                else{
                    //If input is denormalized
                    if (expval < -126){
                        while (expval < -126){
                            inputval = inputval / 10
                            expval++
                        }
                    }
                    else{
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
                    }
                    //Copying fraction part of significand to the last 23 bits
                    for (let i = 0; i < 23; i++) {
                        inputval = inputval * 10
                        if ((Math.round(inputval) % 10) == 1){
                            IEEE754[i + 9] = 1
                        }
                        else{
                            IEEE754[i + 9] = 0
                        }
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

        }
        else
        {
            // Converting Binary (Base-2) to IEEE-754
            //Check if input number is zero
            if (inputval != 0){
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
                    inputval *= -1
                }
                //If input is infinity
                if (expval > 127){
                    for (let i = 1; i < 9; i++){
                        IEEE754[i] = 1
                    }
                }
                else{
                    //If input is denormalized
                    if (expval < -126){
                        while (expval < -126){
                            inputval = inputval / 10
                            expval++
                        }
                    }
                    else{
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
                    }
                    //Copying fraction part of significand to the last 23 bits
                    for (let i = 0; i < 23; i++) {
                        inputval = inputval * 10
                        if ((Math.round(inputval) % 10) == 1){
                            IEEE754[i + 9] = 1
                        }
                        else{
                            IEEE754[i + 9] = 0
                        }
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
        }
        //Adding spaces between sections of the IEEE-754 Binary-32 floating point representation
        let resultval = IEEE754[0] + " " + IEEE754.slice(1, 9).join("") + " " + IEEE754.slice(9, 32).join("")
        let hexval = "0x" + hex.join("")

        // Prints resultval in webapp
        resulttext.text(resultval) 
        hextext.text(hexval) 

    });


    // User presses "SAVE AS TEXT FILE"
    $('#save').on('click', function (e){
        //create or obtain the file's content
        var content = "IEEE-754 Single Precision Binary:\n" + resulttext.text() + "\nHexadecimal Equivalent:\n" + hextext.text();

        //create a file and put the content, name and type
        var file = new File(["\ufeff"+content], 'output.txt', {type: "text/plain:charset=UTF-8"});

        //create a ObjectURL in order to download the created file
        url = window.URL.createObjectURL(file);

        //create a hidden link and set the href and click it
        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = file.name;
        a.click();
        window.URL.revokeObjectURL(url);
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
    $( "#exp" ).on( "keyup", function(e) 
    {
        let exp_value = $('#exp').val()
        let basetype = $('input[name=base]:checked', '#chosenbase').val()        // 'binary' or 'decimal'

        if(basetype == "decimal"){
            if (exp_value > 299) {
                $("#convert").prop("disabled", true);
                $("#expwarning").text("Exponent value too high. The application might crash.")
            }
            else if (exp_value < -99) {
                $("#convert").prop("disabled", true);
                $("#expwarning").text("Exponent value too low. The application might crash.")
            }
            else {
                $("#convert").prop("disabled", false);
                $("#expwarning").text("Valid exponent value.")
            }
        }
    })

});