Vue.component("vueform", {
  data: function() {
    return {
      toSendTester: {
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        zipCode: "",
        email: "",
        phone: "",
        inPerson: false,
        remote: false,
        primaryDevice: "Desktop",
        primaryMakeModel: "",
        secondaryDevice: "Desktop",
        secondaryMakeModel: "",
        primaryConnect: "Broadband",
        secondaryConnect: "Broadband",
        contactUsing: "Email",
        discoveredBy: ""
      }
    };
  },
  computed: {
    dataReady: function() {
      if (this.toSendTester.firstName.length < 1 || !this.isValid(this.toSendTester.firstName)) {
        return "Please ensure your first name is correct.";
      } else if (this.toSendTester.lastName.length < 1 || !this.isValid(this.toSendTester.lastName)) {
        return "Please ensure your last name is correct.";
      } else if (this.toSendTester.streetAddress.length < 5 || !this.noSpecialCharacters(this.toSendTester.streetAddress)) {
        return "Please ensure your street address is correct.";
      } else if (this.toSendTester.city.length < 4 || !this.isValid(this.toSendTester.city)) {
        return "Please ensure your city is correct.";
      } else if (this.toSendTester.zipCode.length != 5 || isNaN(parseInt(this.toSendTester.zipCode))) {
        return "Please ensure your zip code is correct.";
      } else if (this.toSendTester.email.length < 6 || !this.isEmail(this.toSendTester.email) || !this.toSendTester.email.includes("@") || !this.toSendTester.email.includes(".")) {
        return "Please ensure your email is correct.";
      } else if (this.toSendTester.phone.length != 10 || isNaN(parseInt(this.toSendTester.phone))) {
        return "Please ensure your phone number is correct.";
      } else if (!this.toSendTester.inPerson && !this.toSendTester.remote) {
        return "Please select at least one option for how you would like to participate in testing.";
      } else if (this.toSendTester.primaryMakeModel.length < 5) {
        return "Please ensure your primary device make and model is correct.";
      } else if (this.toSendTester.secondaryMakeModel.length < 5) {
        return "Please ensure your secondary device make and model is correct.";
      } else if (this.toSendTester.primaryConnect.length < 1 || !this.isValid(this.toSendTester.primaryConnect)) {
        return "Please ensure your primary internet connection choice is correct.";
      } else if (this.toSendTester.secondaryConnect.length < 1 || !this.isValid(this.toSendTester.secondaryConnect)) {
        return "Please ensure your primary internet connection choice is correct.";
      } else {
        return true;
      }
    }
  },
  methods: {
    isValid: function(str) {
      return /^[a-zA-Z\-\']+$/.test(str);
    },
    noSpecialCharacters: function(str) {
      return /^[a-zA-Z \-\'0-9]+$/.test(str);
    },
    isEmail: function(str) {
      return /^[a-zA-Z.@0-9]+$/.test(str);
    },
    // checkAddress: function() {
    //   let geocoder = new google.maps.Geocoder();
    //
    //   geocoder.geocode({
    //     'address': (this.toSendTester.streetAddress + " " + this.toSendTester.city + " WA, " + this.toSendTester.zipCode)
    //   }, function(results, status) {
    //       if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
    //         this.addressAccepted = true;
    //       } else {
    //         this.addressAccepted = false;
    //       }
    //   });
    // },
    addTester: function() {
      // this.checkAddress();

      if (this.dataReady == true) {
        let newTesterRef = firebaseDB.ref("testers").push();
        newTesterRef.set(this.toSendTester);

        this.acknowledgeMessage("You have been added to the Seattle CUT Group! We will let you know about future testing opportunities.");

        this.toSendTester = {
          firstName: "",
          lastName: "",
          streetAddress: "",
          city: "",
          zipCode: "",
          email: "",
          phone: "",
          inPerson: false,
          remote: false,
          primaryDevice: "Desktop",
          primaryMakeModel: "",
          secondaryDevice: "Desktop",
          secondaryMakeModel: "",
          primaryConnect: "Broadband",
          secondaryConnect: "Broadband",
          contactUsing: "Email",
          discoveredBy: ""
        };

      } else {

        this.acknowledgeMessage(this.dataReady);
      }
    },
    acknowledgeMessage: function(message) {
      $("#commitAcknowledgement").text(message);
      $("#acknowledgementContainer").show().delay(5000).fadeOut();
    }
  },
  template: `
    <div class="space-bottom-100px">
      <div id="acknowledgementContainer" class="acknowledgement">
        <p id="commitAcknowledgement" class="minor-header padding-all-10px"></p>
      </div>
      <div>
        <fieldset class="space-bottom-20px">
          <legend class="minor-header">Your Details:</legend>

          <div class="flex-form-text">
            <div class="label-text">
              <label>First Name: *</label>
              <input required type="text" value="" placeholder="John" v-model="toSendTester['firstName']" class="input-size-10">
            </div>
            <div class="label-text">
              <label>Last Name: *</label>
              <input required type="text" value="" placeholder="Johnson" v-model="toSendTester['lastName']" class="input-size-10">
            </div>
          </div>
          <div class="flex-form-text">
            <div class="label-text">
              <label>Street Address: *</label>
              <input required type="text" value="" placeholder="123 1st St" v-model="toSendTester['streetAddress']" class="input-size-20">
            </div>
            <div class="label-text">
              <label>City: *</label>
              <input required type="text" value="" placeholder="Seattle" v-model="toSendTester['city']" class="input-size-10">
            </div>
            <div class="label-text">
              <label>Zip Code: *</label>
              <input required type="text" value="" placeholder="98101" pattern="[0-9]{5}" v-model="toSendTester['zipCode']" class="input-size-5">
            </div>
          </div>
          <div class="flex-form-text">
            <div class="label-text">
              <label>Email: *</label>
              <input required type="email" value="" placeholder="hi@email.com" v-model="toSendTester['email']" class="input-size-20">
            </div>
            <div class="label-text">
              <label>Phone Number: *</label>
              <input required type="tel" value="" placeholder="1234567890" v-model="toSendTester['phone']" class="input-size-10">
            </div>
          </div>
        </fieldset>
      </div>

      <div class="space-bottom-20px">
        <fieldset class="checkbox-group" required>
          <legend class="minor-header">How would you like to participate? *</legend>

          <div class="checkbox-label">
            <input type="checkbox" id="in-person" name="participation" value="in-person" v-model="toSendTester['inPerson']">
            <label for="in-person">In Person Group</label>
          </div>
          <div class="checkbox-label">
            <input type="checkbox" id="remote" name="participation" value="remote" v-model="toSendTester['remote']">
            <label for="remote">Remote Observation</label>
          </div>
        </fieldset>
      </div>

      <div class="space-bottom-20px">
        <fieldset class="radio-group" required>
          <legend class="minor-header">What is the device you use the most often to connect to the Internet? *</legend>
          <div class="radio-label">
            <input type="radio" id="primary-desktop" name="primary-device" value="Desktop" v-model="toSendTester['primaryDevice']">
            <label for="Desktop">Desktop Computer</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="primary-laptop" name="primary-device" value="Laptop" v-model="toSendTester['primaryDevice']">
            <label for="Laptop">Laptop</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="primary-tablet" name="primary-device" value="Tablet" v-model="toSendTester['primaryDevice']">
            <label for="Tablet">Tablet</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="primary-phone" name="primary-device" value="Phone" v-model="toSendTester['primaryDevice']">
            <label for="Phone">Smart Phone</label>
          </div>

          <div class="label-text">
            <label class="force-block">What is the make and model of this primary device? *</label>
            <input class="force-block input-size-30" required id="primary-make-model" type="text" value="" placeholder="Apple iPhone 10, Microsoft Surface Pro 3, ..." v-model="toSendTester['primaryMakeModel']">
          </div>
        </fieldset>

        <fieldset class="radio-group" required>
          <legend class="minor-header">What is the device you use the second most often to connect to the Internet? *</legend>
          <div class="radio-label">
            <input type="radio" id="secondary-desktop" name="secondary-device" value="Desktop" v-model="toSendTester['secondaryDevice']">
            <label for="Desktop">Desktop Computer</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="secondary-laptop" name="secondary-device" value="Laptop" v-model="toSendTester['secondaryDevice']">
            <label for="Laptop">Laptop</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="secondary-tablet" name="secondary-device" value="Tablet" v-model="toSendTester['secondaryDevice']">
            <label for="Tablet">Tablet</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="secondary-phone" name="secondary-device" value="Phone" v-model="toSendTester['secondaryDevice']">
            <label for="Phone">Smart Phone</label>
          </div>

          <div class="label-text">
            <label class="force-block">What is the make and model of this secondary device? *</label>
            <input class="force-block input-size-30" required id="secondary-make-model" type="text" value="" placeholder="Apple iPhone 10, Microsoft Surface Pro 3, ..." v-model="toSendTester['secondaryMakeModel']">
          </div>
        </fieldset>

        <fieldset class="radio-group" required>
          <legend class="minor-header">What is the most common way you connect to the Internet? *</legend>
          <div class="radio-label">
            <input type="radio" id="primary-broadband" name="primary-connect" value="Broadband" v-model="toSendTester['primaryConnect']">
            <label for="primary-broadband">Broadband at home (Cable, DSL, etc.)</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="primary-phone" name="primary-connect" value="Phone" v-model="toSendTester['primaryConnect']">
            <label for="primary-phone">Phone with Data Plan</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="primary-publicwifi" name="primary-connect" value="Public Wifi" v-model="toSendTester['primaryConnect']">
            <label for="primary-publicwifi">Public Wifi</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="primary-computercenter" name="primary-connect" value="Computer Center" v-model="toSendTester['primaryConnect']">
            <label for="primary-computercenter">Public Computer Center</label>
          </div>
          <div class="label-text">
            <label>Other:</label>
            <input class="input-size-20"type="text" value="" placeholder="..." v-model="toSendTester['primaryConnect']">
          </div>
        </fieldset>

        <fieldset class="radio-group" required>
          <legend class="minor-header">What is the second most common way you connect to the Internet? *</legend>
          <div class="radio-label">
            <input type="radio" id="secondary-broadband" name="secondary-connect" value="Broadband" v-model="toSendTester['secondaryConnect']">
            <label for="secondary-broadband">Broadband at home (Cable, DSL, etc.)</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="secondary-phone" name="secondary-connect" value="Phone" v-model="toSendTester['secondaryConnect']">
            <label for="secondary-phone">Phone with Data Plan</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="secondary-publicwifi" name="secondary-connect" value="Public Wifi" v-model="toSendTester['secondaryConnect']">
            <label for="secondary-publicwifi">Public Wifi</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="secondary-computercenter" name="secondary-connect" value="Computer Center" v-model="toSendTester['secondaryConnect']">
            <label for="secondary-computercenter">Public Computer Center</label>
          </div>
          <div class="label-text">
            <label>Other:</label>
            <input class="input-size-20"type="text" value="" placeholder="..." v-model="toSendTester['secondaryConnect']">
          </div>
        </fieldset>
      </div>

      <div>
        <fieldset class="radio-group" required>
          <legend class="minor-header">How would you prefer to be contacted regarding testing oppotunities? *</legend>
          <div class="radio-label">
            <input type="radio" id="contactByEmail" name="contactByEmail" value="Email" v-model="toSendTester['contactUsing']">
            <label for="contactByEmail">Email</label>
          </div>
          <div class="radio-label">
            <input type="radio" id="contactByText" name="contactByText" value="Text" v-model="toSendTester['contactUsing']">
            <label for="contactByText">Text</label>
          </div>
        </fieldset>

        <fieldset required>
          <div class="label-text">
            <label class="force-header">How did you hear about the Seattle CUT Group?</label>
            <input class="input-size-30" type="text" value="" placeholder="From a friend!" v-model="toSendTester['discoveredBy']">
          </div>
        </fieldset>
      </div>

      <button v-on:click="addTester" class="button-standard-primary padding-all-10px minor-header space-top-20px transition-all-200">Submit</button>
    </div>`
});

const app = new Vue({
  el: '#vueform'
});
