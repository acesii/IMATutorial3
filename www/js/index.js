/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Nurse Data as global data structure
    nurse_data : [],
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    updateNurseList: function() {
      $.getJSON ("http://localhost/~student/listNurses.json",
        function (data) {
          // Store the data we have loaded for later use.
          app.nurse_data=data
          for (index = 0; index < data.length; ++index) {
            // Maybe you could sub-navigate the specialisms list here and add a "tag" for each
            // specialism
            $("#NurseList").append ("<li onClick=\"javascript:app.showNurseDetails('"+data[index].id+"');\">"+
                                        "<h3>"+
                                        data[index].forename+", "+data[index].surname+
                                        "</h3><p>Grade"+data[index].grade+
                                        "</p></li>");
          }
          $("#NurseList").listview ("refresh");
        }
      );
    },
    showNurseDetails: function(nurse_id) {
      // We need to find the right entry in the nurse list, so iterate over
      // the nurse list until we find the provided ID, if we find a match set

      // nurse_to_show
      var nurse_to_show;
      for (index = 0; index < app.nurse_data.length; ++index) {
        if ( app.nurse_data[index].id == nurse_id ) {
          nurse_to_show = app.nurse_data[index]
        }
      }
      if ( nurse_to_show != null ) {
        $("#NurseDetailsHeader").html(nurse_to_show.surname+", "+nurse_to_show.forename);
        $("#NurseDetailsContent").html("Grade "+nurse_to_show.grade);
      }
      else {
        alert("Nurse "+nurse_id+" not found");
      }
      $.mobile.changePage($("#NurseDetails"),{allowSamePageTransition:true,
                                              transition:"flip"});
    }

};
