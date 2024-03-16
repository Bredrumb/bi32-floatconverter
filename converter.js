
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


        // Insert convertion stuffs here then store value in "resultval" and "hexval"
        if(basetype == "decimal")
        {
            // Converting Binary (Base-2) to IEEE-754
        }
        else
        {
            // Converting Decimal (Base-10) to IEEE-754
        }

        let resultval = inputval
        let hexval = expval

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