var MIABOOTSTRAP = function() {
    'use strict';

    var _worker;
    var _sats;
    var _menuBuilt = false;
    var _satellites = [];
    
    function initWorkers() {
        if (Modernizr.webworkers) {
            
            _worker = new Worker('/assets/js/engine/worker.js');
            _worker.addEventListener('message', function(e) {

             if (!_menuBuilt) {
                buildSatelliteSelector(JSON.parse(e.data)); 
                _menuBuilt = true;   
             }
             
             MIARENDERER.render(JSON.parse(e.data));
            }, false);

            
            _sats =
                [[
                    "ISS (ZARYA)",
                    "1 25544U 98067A   15086.17334635  .00015434  00000-0  22972-3 0  9994",
                    "2 25544  51.6460 133.7315 0007136 144.2025 255.6332 15.55307244935270"
                ]];
                _sats = [["OSCAR 7 (AO-7)","1 07530U 74089B   15096.17810514 -.00000053  00000-0 -61691-4 0  9998","2 07530 101.5140  73.7964 0012401  83.4806 345.6356 12.53613076848233"],["UOSAT 2 (UO-11)","1 14781U 84021B   15096.75205752  .00001000  00000-0  13163-3 0  9998","2 14781  97.8095 155.5682 0007392 310.2717  49.7850 14.82273017671445"],["LUSAT (LO-19)","1 20442U 90005G   15096.06201086  .00000241  00000-0  10451-3 0  9991","2 20442  98.5073  33.1096 0011969   7.9208 352.2163 14.32710624316619"],["ITAMSAT (IO-26)","1 22826U 93061D   15097.09991602  .00000204  00000-0  96141-4 0  9998","2 22826  98.6963  47.3950 0009552 143.0930 217.0911 14.30172538122923"],["RADIO ROSTO (RS-15)","1 23439U 94085A   15097.23290543 -.00000033  00000-0  28060-3 0  9993","2 23439  64.8142  76.2111 0151771  25.7964 335.0430 11.27563023835151"],["JAS-2 (FO-29)","1 24278U 96046B   15096.86616856 -.00000004  00000-0  34802-4 0  9991","2 24278  98.5333  75.3295 0349404 255.7034 160.5754 13.53048744920386"],["TECHSAT 1B (GO-32)","1 25397U 98043D   15096.89815120  .00000102  00000-0  63591-4 0  9996","2 25397  98.5128  49.6034 0001774 133.5394 258.8124 14.23531747869655"],["ISS (ZARYA)","1 25544U 98067A   15097.55763027  .00015620  00000-0  23136-3 0  9999","2 25544  51.6467  76.8782 0005980 189.2015 278.1432 15.55438568937047"],["PCSAT (NO-44)","1 26931U 01043C   15097.10667301  .00000191  00000-0  10540-3 0  9999","2 26931  67.0534   0.4437 0006252 264.0771  95.9617 14.30286779705633"],["SAUDISAT 1C (SO-50)","1 27607U 02058C   15097.17082775  .00001661  00000-0  25756-3 0  9998","2 27607  64.5555  55.6219 0077766 302.2246  57.1333 14.74600970660815"],["CUTE-1 (CO-55)","1 27844U 03031E   15096.84043591  .00000363  00000-0  18504-3 0  9990","2 27844  98.6972 106.3827 0010463 141.8184 302.5533 14.21756186610308"],["CUBESAT XI-IV (CO-57)","1 27848U 03031J   15097.11579407  .00000302  00000-0  15804-3 0  9998","2 27848  98.7068 106.5242 0010274 147.8716 254.0518 14.21409574610253"],["MOZHAYETS 4 (RS-22)","1 27939U 03042A   15097.09375706  .00001054  00000-0  20094-3 0  9996","2 27939  97.8337 262.1863 0012088 252.8240 107.1610 14.65920373615771"],["HAMSAT (VO-52)","1 28650U 05017B   15096.97246519  .00002448  00000-0  27731-3 0  9999","2 28650  97.5723  92.6874 0022529 267.2224  92.6414 14.87091730536861"],["CUBESAT XI-V (CO-58)","1 28895U 05043F   15096.77631107  .00001312  00000-0  26623-3 0  9996","2 28895  97.8226 288.2815 0017629 158.8834 201.3100 14.62639746503153"],["CUTE-1.7+APD II (CO-65)","1 32785U 08021C   15096.51721887  .00002013  00000-0  23257-3 0  9994","2 32785  97.6570 142.6998 0012144 306.8055 185.4995 14.86607750375582"],["DELFI-C3 (DO-64)","1 32789U 08021G   15096.17768931  .00010167  00000-0  84998-3 0  9999","2 32789  97.6783 157.3015 0010053 261.0084 159.7330 14.98653629376291"],["SEEDS II (CO-66)","1 32791U 08021J   15096.43657991  .00002769  00000-0  30417-3 0  9990","2 32791  97.6588 144.3586 0012529 299.6152  60.3816 14.88395735375643"],["YUBILEINY (RS-30)","1 32953U 08025A   15097.08621047  .00000010  00000-0 -13620-7 0  9998","2 32953  82.5068  18.4543 0017581 235.0944 124.8478 12.43058394311779"],["PRISM (HITOMI)","1 33493U 09002B   15097.12006969  .00006987  00000-0  68228-3 0  9997","2 33493  98.2532 291.0781 0016175 199.8014 160.2533 14.92642556335974"],["KKS-1 (KISEKI)","1 33499U 09002H   15096.18636701  .00001808  00000-0  28072-3 0  9991","2 33499  98.2250 232.3740 0010289  57.9995  47.3950 14.74344423333004"],["SWISSCUBE","1 35932U 09051B   15096.46196496  .00001444  00000-0  34424-3 0  9996","2 35932  98.3989 214.7591 0007709 191.5375 168.5646 14.55252692293532"],["BEESAT","1 35933U 09051C   15096.80665246  .00001195  00000-0  28540-3 0  9994","2 35933  98.4000 215.9915 0005598 201.5420 158.5542 14.55462413293671"],["ITUPSAT 1","1 35935U 09051E   15096.84375685  .00001106  00000-0  26933-3 0  9991","2 35935  98.4104 216.2700 0008102 194.2969 165.8000 14.54710548293555"],["XIWANG-1 (HOPE-1)","1 36122U 09072B   15097.02589753 -.00000060  00000-0 -43517-4 0  9995","2 36122 100.2035 144.3452 0006888 283.0539  76.9809 13.16325222255097"],["TISAT 1","1 36799U 10035E   15097.15328267  .00003772  00000-0  41604-3 0  9996","2 36799  98.0123 196.7421 0014240  82.6320   4.3050 14.88033396256393"],["JUGNU","1 37839U 11058B   15095.81798899  .00000495  00000-0  12222-3 0  9994","2 37839  19.9613 281.2363 0019020 328.9595 163.6934 14.12443986179976"],["SRMSAT","1 37841U 11058D   15096.85779227  .00000451  00000-0  10360-3 0  9999","2 37841  19.9722 300.1816 0011806 268.6205 207.3877 14.10461128179862"],["M-CUBED & EXP-1 PRIME","1 37855U 11061F   15096.44718013  .00008246  00000-0  50378-3 0  9992","2 37855 101.7205 274.1859 0198761 282.7767  75.1295 14.95771167186421"],["HORYU 2","1 38340U 12025D   15096.84735807  .00002558  00000-0  39686-3 0  9996","2 38340  98.3065  64.9814 0011262 330.3207  29.7360 14.74017100155028"],["AAUSAT3","1 39087U 13009B   15097.06701894  .00000894  00000-0  32888-3 0  9990","2 39087  98.6071 295.7083 0012822 154.3625 205.8201 14.35026813110457"],["STRAND-1","1 39090U 13009E   15096.12704306  .00000317  00000-0  12730-3 0  9995","2 39090  98.6133 295.2580 0009688 152.8860 207.2833 14.34755461110316"],["BEESAT-3","1 39134U 13015E   15096.89896949  .00009009  00000-0  54150-3 0  9999","2 39134  64.8731 285.4125 0033414 260.9132  98.8209 15.10930472107923"],["BEESAT-2","1 39136U 13015G   15096.55026540  .00007600  00000-0  47670-3 0  9990","2 39136  64.8737 288.3764 0034177 260.1635  99.5627 15.09503835107849"],["CUBEBUG-1 (CAPITAN BETO)","1 39153U 13018D   15097.18924931  .00002082  00000-0  28836-3 0  9995","2 39153  98.0182 181.7643 0018660 121.0990 239.2054 14.78984221104987"],["ZACUBE-1 (TSHEPISOSAT)","1 39417U 13066B   15097.12165914  .00001924  00000-0  25669-3 0  9998","2 39417  97.7365 162.2905 0060797   9.4867 350.7478 14.79457213 74122"],["TRITON-1","1 39427U 13066M   15096.77520163  .00001684  00000-0  28287-3 0  9992","2 39427  97.7228 151.7039 0116920  35.7960 325.1010 14.66454815 73407"],["GOMX 1","1 39430U 13066Q   15097.11131513  .00002271  00000-0  42857-3 0  9994","2 39430  97.7181 145.3313 0155338  54.0113 307.5380 14.57866901 73028"],["HUMSAT-D","1 39433U 13066T   15096.76845714  .00003364  00000-0  36061-3 0  9996","2 39433  97.7451 168.7259 0032485   0.3220 359.8012 14.88930256 74481"],["EAGLE 2","1 39436U 13066W   15096.46089288  .00025018  00000-0  18472-2 0  9997","2 39436  97.7508 172.3630 0021997 348.8097  11.2636 15.03038387 74707"],["VELOX-PII","1 39438U 13066Y   15096.77009557  .00001601  00000-0  22732-3 0  9991","2 39438  97.7335 159.7338 0072579  15.4061 344.9335 14.76503972 73922"],["CUBEBUG-2 (LO-74)","1 39440U 13066AA  15096.80894495  .00001863  00000-0  27382-3 0  9997","2 39440  97.7314 157.9265 0082749  19.5541 340.8811 14.74297494 73818"],["FUNCUBE-1 (AO-73)","1 39444U 13066AE  15096.77190753  .00002300  00000-0  30222-3 0  9997","2 39444  97.7369 162.1372 0060225  10.0232 350.2166 14.79929549 72856"],["UWE-3","1 39446U 13066AG  15097.13066484  .00001850  00000-0  25993-3 0  9991","2 39446  97.7334 160.1788 0072181  13.9014 346.4162 14.76787317 72768"],["SPROUT","1 39770U 14029E   15096.83186374  .00002016  00000-0  25064-3 0  9992","2 39770  97.8676 194.6481 0011183  78.5534 281.6930 14.83611405 47058"],["DUCHIFAT-1","1 40021U 14033M   15097.15537118  .00004760  00000-0  52920-3 0  9999","2 40021  97.9609 357.5341 0015300  60.3035 299.9700 14.87559868 43243"]];
                            
            messageWorker('start', _sats);
        } else {
        }            
    }   
    
    function messageWorker(command, data) {
        
        var message = {
            cmd: command,
            data: data
        };
        
        _worker.postMessage(message);
    } 
    
    function buildSatelliteSelector(sats) {
        var selected = [];
        
        _satellites = sats;
        
        var selector = jQuery('<div>',{id: 'satselectorlist', 'class': 'btn-group', 'data-toggle': 'buttons', 'style':'width:100%'}).appendTo('#satelliteselector');
        jQuery.each(sats, function(key, satellite){
            //jQuery('#satselectorlist').append('<label class="btn btn-default" style="clear:both; width:100%"><input type="checkbox" class="satellitebutton" autocomplete="off" id="' + satellite.catnum + '"> ' + satellite.satname + '</label>');
            jQuery('#satselectorlist').append(' \
            <div class="switch tiny fl"> \
            <input type="checkbox" class="satellitebutton" id="' + satellite.catnum + '"> \
            <label for="' + satellite.catnum + '"></label> \
             \
            </div><span class="label satlabel">' + satellite.satname + '</span><div class="clearfix"></div>');
        });
        
        jQuery('#satselectorlist').on('change', '.satellitebutton', function(e){
            selected = [];
            jQuery('.satellitebutton').each(function(){
                if (jQuery(this).prop('checked')) {
                    selected.push(jQuery(this).prop('id'));    
                }    
            });  
            messageWorker('selection', selected);
            
            jQuery('#singlesatelliteselector').html('');
            jQuery('#singlenosats').show();
            var first = ' checked ';
            jQuery(selected).each(function(id){
                for (var i=0; i<_satellites.length; i++) {
                    if (this == _satellites[i].catnum) {
                        jQuery('#singlesatelliteselector').append(' \
                        <div class="switch tiny fl"> \
                        <input type="radio" class="singlesatellitebutton"' + first + 'name="selectedsat" id="1' + this + '" data-id="' + this + '"> \
                        <label for="1' + this + '"></label> \
                         \
                        </div><span class="label satlabel">' + _satellites[i].satname + '</span><div class="clearfix"></div>');
                        first = '';
                        jQuery('#singlenosats').hide();
                        break;
                    }
                }
            });
                    
        });

    }
    
    function getPosition(options) {
        var deferred = $.Deferred();

        navigator.geolocation.getCurrentPosition(
            deferred.resolve,
            deferred.reject,
            options);

        return deferred.promise();
    };

    function initViewLoader() {
        jQuery('#viewmenu').on('click', '.viewloader', function(e){
            e.preventDefault();
            //e.stopPropagation();
            
            var view = jQuery(this).data('view');
            viewLoader(view);
        });
        //viewLoader('threedview');    
        viewLoader('home');    
    }

    function viewLoader(view) {
        var templateFile = '/templates/' + view + '/' + view + '.html';
        
        jQuery.ajax({
            url: templateFile,
            cache: false
        }).done(function(html) {
            jQuery( "#templatecontainer" ).html(html);

            var templateFile = '/templates/' + view + '/viewoptions.html';

            jQuery.ajax({
                url: templateFile,
                cache: false
            })
            .done(function(){})
            .fail(function(){})
            .always(function(html){
                jQuery('#viewoptions').html(html);
                var controllerFile = '/assets/js/modules/' + view + '/' + view + '.js';
                
                jQuery.getScript(controllerFile).done(function(e){
                    
                    if (miaview.viewName !== undefined) {
                        jQuery('#currentview').html(miaview.viewName);    
                    }
                    
                    if (miaview.init !== undefined) {
                        miaview.init();
                    }
                });                
                
            });            

            
        }).fail(function() {
            alert('Error - Failed to load template');
        }).always(function() {
        });
          
    }
    
    function initUI() {
      jQuery(document).foundation({
        offcanvas : {
            open_method: 'overlap_single', 
            close_on_click : false
        }
      });        
    }   
     
    return {
    
        run : function() {
            initUI();
            initWorkers();
            getPosition().then(function(e) {
                initViewLoader();
            });
        }
    }
};

jQuery(document).ready(function() {
    'use strict';   

    var bootstrap = new MIABOOTSTRAP();
    bootstrap.run();
});