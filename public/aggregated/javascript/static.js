/************************************************************************
 * 'static.js'
 *
 * This file is GENERATED by the AssetAggregator; do not edit it.
 * Last modified: 2016-07-14 01:06:05 +0000
 * Generated at: 2016-07-14 16:15:14 +0000
 ************************************************************************/


/************************************************************************
 * :asset_packager_compatibility, 'config/asset_packages.yml' (last modified: 2016-07-14 01:06:05 +0000)
 ************************************************************************/





/************************************************************************
 * :asset_packager_compatibility, 'config/asset_packages.yml' (last modified: 2016-07-14 01:06:05 +0000)
 ************************************************************************/





/************************************************************************
 * :files, 'public/javascripts/shared', ... (last modified: (none))
 ************************************************************************/





/************************************************************************
 * :files, 'app/views', ... (last modified: (none))
 ************************************************************************/





/************************************************************************
 * :files, 'app/views', ... (last modified: 2015-11-10 00:53:08 +0000)
 ************************************************************************/

/* ----------------------------------------------------------------------
   - app/views/static/copyright/faq.coffee (last modified: 2015-11-10 00:53:08 +0000)
   ---------------------------------------------------------------------- */
(function() {
  Scribd.CopyrightFaq = (function() {
    function CopyrightFaq(container) {
      this.container = $(container);
      this.flatten_questions();
      this.container.dispatch("click", {
        question_toggle: (function(_this) {
          return function(btn) {
            return btn.next(".question_response").slideToggle();
          };
        })(this)
      });
    }

    CopyrightFaq.prototype.flatten_questions = function() {
      var i, len, name, node, q, questions, ref, results, tuples;
      questions = this.container.find(".inner_content").find("strong");
      questions = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = questions.length; i < len; i++) {
          q = questions[i];
          results.push($(q).closest("p").wrap('<a class="question_toggle"></a>').closest(".question_toggle"));
        }
        return results;
      })();
      tuples = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = questions.length; i < len; i++) {
          q = questions[i];
          q.nextUntil(".question_toggle").wrapAll('<div class="question_response"><div>');
          q.next(".question_response").andSelf().wrapAll('<div class="question_answer"></div>');
          results.push([q.text(), q.closest(".question_answer")]);
        }
        return results;
      })();
      tuples.sort(function(a, b) {
        var out;
        a = a[0];
        b = b[0];
        out = a < b ? -1 : a > b ? 1 : 0;
        return out;
      });
      results = [];
      for (i = 0, len = tuples.length; i < len; i++) {
        ref = tuples[i], name = ref[0], node = ref[1];
        results.push(node.parent().append(node));
      }
      return results;
    };

    return CopyrightFaq;

  })();

}).call(this);




/************************************************************************
 * :class_inlines, 'app/views', ... (last modified: 2016-01-15 19:39:42 +0000)
 ************************************************************************/

/* ----------------------------------------------------------------------
   - app/views/static/about_container.coffee (last modified: 2015-11-10 00:53:08 +0000)
   ---------------------------------------------------------------------- */
(function() {
  Scribd.AboutSetup = (function() {
    function AboutSetup(container) {
      this.container = container;
      this.container = $(this.container);
      this.container.parallax_folds();
      this.container.find(".sections").stick_in_parent({
        parent: this.container
      });
    }

    return AboutSetup;

  })();

}).call(this);


/* ----------------------------------------------------------------------
   - app/views/static/about.coffee (last modified: 2015-11-10 00:53:08 +0000)
   ---------------------------------------------------------------------- */
(function() {
  Scribd.About = (function() {
    function About(container) {
      this.container = container;
      this.container = $(this.container);
      this.setup_events();
      this.setup_rolling_text();
    }

    About.prototype.setup_events = function() {
      return this.container.find(".number.odometer").scrolled_into_viewport((function(_this) {
        return function(el) {
          return setTimeout(function() {
            var $el;
            $el = $(el);
            return $el.text($el.data("number"));
          }, 1000);
        };
      })(this));
    };

    About.prototype.setup_rolling_text = function() {
      this.interval = null;
      return this.container.find(".awards .rolling_text_container").scrolled_into_viewport((function(_this) {
        return function(el) {
          if (_this.interval) {
            return;
          }
          return _this.interval = setInterval(function() {
            var $el, actual_top, desired_position, moving_container, step;
            $el = $(el);
            moving_container = $el.find(".moving_container");
            actual_top = moving_container.css("top");
            actual_top = Number(actual_top.substr(0, actual_top.length - 2));
            step = Number(moving_container.data("roll_step"));
            desired_position = actual_top - step;
            if ((desired_position + moving_container.height()) < step) {
              desired_position = 0;
            }
            return $el.find(".moving_container").css("top", desired_position);
          }, 3000);
        };
      })(this));
    };

    return About;

  })();

}).call(this);


/* ----------------------------------------------------------------------
   - app/views/static/team.coffee (last modified: 2016-01-15 19:39:42 +0000)
   ---------------------------------------------------------------------- */
(function() {
  Scribd.Team = (function() {
    function Team(container) {
      this.container = container;
      this.container = $(this.container);
      this.setup_events();
    }

    Team.prototype.setup_events = function() {
      return this.container.dispatch("click", {
        tab: (function(_this) {
          return function($el) {
            _this.container.find(".employee_container").hide();
            _this.container.find(".employee_container." + ($el.data('department'))).show();
            _this.container.find(".tab").removeClass("current");
            $el.addClass("current");
            return _this.container.find(".employee_promo").addClass("offscreen");
          };
        })(this),
        employee: (function(_this) {
          return function($el) {
            var tmpl;
            if (!$el.hasClass("has_description")) {
              return;
            }
            $("html, body").animate({
              scrollTop: _this.container.find(".employees").offset().top
            });
            tmpl = _.template($el.data('employee_template'));
            return _this.container.find(".employee_promo").html(tmpl).removeClass("offscreen");
          };
        })(this),
        close_promo: (function(_this) {
          return function($el) {
            return $el.parent(".employee_promo").addClass("offscreen");
          };
        })(this)
      });
    };

    return Team;

  })();

}).call(this);




/************************************************************************
 * :class_inlines, 'spec_javascripts/js_spec', ... (last modified: (none))
 ************************************************************************/
