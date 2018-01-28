$(document).ready(function() {
  let mobileNav = $("#mobile-nav-button");
  let sectionNav = $("#section-nav");
  let sectionLink = $(".section-link");
  let navBttn = $("#button-bars");
  let headerTitle = $("#header-nav-title");

  mobileNav.attr("class", "");

  let x = $(window).width();

  if (x >= 1000) {
    headerTitle.text("Seattle Civic User Testing Group")
  } else {
    headerTitle.text("Seattle CUT Group")
  }

  if (x >= 850) {
    sectionNav.css("display", "block");
    mobileNav.css("display", "none");
  } else {
    sectionNav.css("display", "none");
    mobileNav.css("display", "inline-block");
  }

  mobileNav.on("click", function(event) {
    if (mobileNav.attr("class") == "toggled") {
      sectionNav.css("display", "none");
      mobileNav.attr("class", "");
      navBttn.attr("class", "fa fa-bars");
    } else {
      sectionNav.css("display", "block");
      mobileNav.attr("class", "toggled");
      navBttn.attr("class", "fa fa-times")
    }
  });

  sectionLink.on("click", function(event) {
    if (mobileNav.attr("class") == "toggled") {
      sectionNav.css("display", "none");
      mobileNav.attr("class", "");
    }
  });

  window.onresize = function(event) {
    x = $(window).width();

    mobileNav.attr("class", "");
    navBttn.attr("class", "fa fa-bars");

    if (x >= 1000) {
      headerTitle.text("Seattle Civic User Testing Group")
    } else {
      headerTitle.text("Seattle CUT Group")
    }

    if (x >= 850) {
      sectionNav.css("display", "block");
      mobileNav.css("display", "none");
    } else {
      sectionNav.css("display", "none");
      mobileNav.css("display", "inline-block");
    }
  };
});
