(function ($) {

    var lang = function (dictionary, options) {

        this.run = function () {

            var $this = this;

            $("[" + this.options.dataAttributeToken + "]").each(function (index) {
                $this.setText($(this));
            });

            $("[" + this.options.dataAttributeTokenPlaceholder + "]").each(function (index) {
                $this.setPlaceholder($(this));
            });

            $("[" + this.options.dataAttributeTokenTitle + "]").each(function (index) {
                $this.setTitle($(this));
            });
        }

        this.setText = function ($element) {
            var token = $element.attr(this.options.dataAttributeToken);
            $element.text(this.getTokenValue(token));
        }

        this.setPlaceholder = function ($element) {
            var token = $element.attr(this.options.dataAttributeTokenPlaceholder);
            $element.attr('placeholder', this.getTokenValue(token));
        }

        this.setTitle = function ($element) {
            var token = $element.attr(this.options.dataAttributeTokenTitle);
            $element.attr('title', this.getTokenValue(token));
        }

        this.change = function (lang) {
            this.options.currentLang = lang;
            
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("jqueryLangChub", lang);
            }

            this.run();
        }

        this.getTokenValue = function (token, lang) {
            return this.dictionary[lang || this.options.currentLang][token];
        }

        this.defaults = {
            currentLang: "pt-br",
            dataAttributeToken: "data-lang-token",
            dataAttributeTokenPlaceholder: "data-lang-placeholder",
            dataAttributeTokenTitle: "data-lang-title"
        };

        this.options = $.extend({}, this.defaults, options);

        this.dictionary = dictionary;

        if (typeof (Storage) !== "undefined")
        {
            if (options !== undefined && options.currentLang !== undefined) {
                localStorage.setItem("jqueryLangChub", this.options.currentLang);
            }
            else
            {
                if (localStorage.jqueryLangChub === undefined)
                    localStorage.setItem("jqueryLangChub", this.options.currentLang);
                else
                    this.options.currentLang = localStorage.jqueryLangChub;
            }                
        }

        this.run();

        return this;
    };

    $.lang = lang;

}(jQuery));