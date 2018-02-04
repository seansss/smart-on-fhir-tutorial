(function(window){
  window.extractImmunizationData = function() {
    var retImmunization = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      retImmunization.reject();
    }

    function onImmunizationReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        var pt = patient.read();
        /*
        var obv = smart.patient.api.fetchAll({
                    type: 'Observation',
                    query: {
                      code: {
                        $or: ['http://loinc.org|8302-2', 'http://loinc.org|8462-4',
                              'http://loinc.org|8480-6', 'http://loinc.org|2085-9',
                              'http://loinc.org|2089-1', 'http://loinc.org|55284-4']
                      }
                    }
                  });
          */
        $.when(pt, obv).fail(onError);

        $.when(pt, obv).done(function(patient, obv) {

          // retImmunization.resolve(p);
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onImmunizationReady, onError);
    return retImmunization.promise();

  };

})(window);
