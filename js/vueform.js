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
      },
      primaryConnect: "Broadband",
      secondaryConnect: "Broadband",
      primaryConnectOther: "",
      secondaryConnectOther: ""
    };
  },
  computed: {
    dataReady: function() {
      if (this.toSendTester.firstName.length < 1 || !this.isValid(this.toSendTester.firstName)) {
        return "Please ensure your first name is correct.";
      } else if (this.toSendTester.lastName.length < 1 || !this.isValid(this.toSendTester.lastName)) {
        return "Please ensure your last name is correct.";
      } else if (this.toSendTester.streetAddress.length < 5 || !this.isAddress(this.toSendTester.streetAddress)) {
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
        return "Please ensure your secondary internet connection choice is correct.";
      } else {
        return true;
      }
    },
    toSendPrimaryConnect: function () {
      if (this.primaryConnectOther.length == 0) {
        return this.primaryConnect;
      } else {
        this.primaryConnect = "";
        return this.primaryConnectOther;
      }
    },
    toSendSecondaryConnect: function () {
      if (this.secondaryConnectOther.length == 0) {
        return this.secondaryConnect;
      } else {
        this.secondaryConnect = "";
        return this.secondaryConnectOther;
      }
    }
  },
  methods: {
    isValid: function(str) {
      return /^[a-zA-Z \-\']+$/.test(str);
    },
    isAddress: function(str) {
      return /^[a-zA-Z \-\'0-9.,]+$/.test(str);
    },
    isEmail: function(str) {
      return /^[a-zA-Z.@0-9]+$/.test(str);
    },
    setPrimaryConnect: function(str) {
      this.primaryConnect = str;
      this.primaryConnectOther = "";
    },
    setSecondaryConnect: function(str) {
      this.secondaryConnect = str;
      this.secondaryConnectOther = "";
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

      this.toSendTester.primaryConnect = this.toSendPrimaryConnect;
      this.toSendTester.secondaryConnect = this.toSendSecondaryConnect;

      if (this.dataReady == true) {

        let sendingData = this.toSendTester;

        firebase.auth().createUserWithEmailAndPassword(this.toSendTester.email, "password").then(function() {

          let newTesterRef = firebaseDB.ref("testers").push();
          newTesterRef.set(sendingData);

          acknowledgeMessage("You have been added to the Seattle CUT Group! We will let you know about future testing opportunities.");

        }, function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;

          acknowledgeMessage(errorMessage);
        });

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
          desktop: false,
          desktopModel: "",
          laptop: false,
          laptopModel: "",
          tablet: false,
          tabletModel: "",
          smartphone: false,
          smartphoneModel: "",
          broadband: false,
          dataplan: false,
          publicwifi: false,
          publiccomputer: false,
          otherconnection: "",
          contactUsing: "Email",
          discoveredBy: ""
        };

      } else {

        acknowledgeMessage(this.dataReady);
      }
    }
  },
  template: `
    <div class="space-bottom-100px">
      <div id="acknowledgementContainer" class="acknowledgement">
        <p id="commitAcknowledgement" class="minor-header padding-all-10px"></p>
      </div>
      <div id="verifyContainer" class="acknowledgement">
        <p id="commitVerification" class="minor-header padding-all-10px">Please Verify Your Email</p>
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
        <fieldset class="checkbox-group" required>
          <legend class="minor-header">What are the devices you use most often to connect to the internet? Select all that apply. *</legend>

          <div class="checkbox-label">
            <input type="checkbox" id="desktop" name="device" value="desktop" v-model="toSendTester['desktop']">
            <label for="desktop">Desktop Computer</label>
          </div>
          <div class="checkbox-label">
            <input type="checkbox" id="laptop" name="device" value="laptop" v-model="toSendTester['laptop']">
            <label for="laptop">Laptop Computer</label>
          </div>
          <div class="checkbox-label">
            <input type="checkbox" id="tablet" name="device" value="tablet" v-model="toSendTester['tablet']">
            <label for="tablet">Tablet</label>
          </div>
          <div class="checkbox-label">
            <input type="checkbox" id="smartphone" name="device" value="smartphone" v-model="toSendTester['smartphone']">
            <label for="smartphone">Smart Phone</label>
          </div>
        </fieldset>
      </div>

      <div class="space-bottom-20px">
        <fieldset class="checkbox-group" required>
          <legend class="minor-header">What are the most common ways you connect to the Internet? Select all that apply. *</legend>

          <div class="checkbox-label">
            <input type="checkbox" id="broadband" name="device" value="broadband" v-model="toSendTester['broadband']">
            <label for="broadband">Broadband at home (Cable, DSL, etc.)</label>
          </div>
          <div class="checkbox-label">
            <input type="checkbox" id="dataplan" name="device" value="dataplan" v-model="toSendTester['dataplan']">
            <label for="dataplan">Phone with Data Plan</label>
          </div>
          <div class="checkbox-label">
            <input type="checkbox" id="publicwifi" name="device" value="publicwifi" v-model="toSendTester['publicwifi']">
            <label for="publicwifi">Public Wifi</label>
          </div>
          <div class="checkbox-label">
            <input type="checkbox" id="publiccomputer" name="device" value="publiccomputer" v-model="toSendTester['publiccomputer']">
            <label for="publiccomputer">Public Computer Center</label>
          </div>
          <div class="checkbox-label">
            <div class="label-text">
              <label>Other:</label>
              <input class="input-size-20" type="text" value="" placeholder="..." v-model="toSendTester['otherconnection']">
            </div>
          </div>
        </fieldset>
      </div>

      <div>
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

function acknowledgeMessage(message) {
  $("#commitAcknowledgement").text(message);
  $("#acknowledgementContainer").show().delay(5000).fadeOut();
};
