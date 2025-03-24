(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var lib = {};
var conventions = {};
var hasRequiredConventions;
function requireConventions() {
  if (hasRequiredConventions) return conventions;
  hasRequiredConventions = 1;
  function find(list, predicate, ac) {
    if (ac === void 0) {
      ac = Array.prototype;
    }
    if (list && typeof ac.find === "function") {
      return ac.find.call(list, predicate);
    }
    for (var i = 0; i < list.length; i++) {
      if (hasOwn(list, i)) {
        var item = list[i];
        if (predicate.call(void 0, item, i, list)) {
          return item;
        }
      }
    }
  }
  function freeze(object, oc) {
    if (oc === void 0) {
      oc = Object;
    }
    if (oc && typeof oc.getOwnPropertyDescriptors === "function") {
      object = oc.create(null, oc.getOwnPropertyDescriptors(object));
    }
    return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
  }
  function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }
  function assign(target, source) {
    if (target === null || typeof target !== "object") {
      throw new TypeError("target is not an object");
    }
    for (var key in source) {
      if (hasOwn(source, key)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var HTML_BOOLEAN_ATTRIBUTES = freeze({
    allowfullscreen: true,
    async: true,
    autofocus: true,
    autoplay: true,
    checked: true,
    controls: true,
    default: true,
    defer: true,
    disabled: true,
    formnovalidate: true,
    hidden: true,
    ismap: true,
    itemscope: true,
    loop: true,
    multiple: true,
    muted: true,
    nomodule: true,
    novalidate: true,
    open: true,
    playsinline: true,
    readonly: true,
    required: true,
    reversed: true,
    selected: true
  });
  function isHTMLBooleanAttribute(name) {
    return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
  }
  var HTML_VOID_ELEMENTS = freeze({
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  });
  function isHTMLVoidElement(tagName) {
    return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
  }
  var HTML_RAW_TEXT_ELEMENTS = freeze({
    script: false,
    style: false,
    textarea: true,
    title: true
  });
  function isHTMLRawTextElement(tagName) {
    var key = tagName.toLowerCase();
    return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
  }
  function isHTMLEscapableRawTextElement(tagName) {
    var key = tagName.toLowerCase();
    return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
  }
  function isHTMLMimeType(mimeType) {
    return mimeType === MIME_TYPE.HTML;
  }
  function hasDefaultHTMLNamespace(mimeType) {
    return isHTMLMimeType(mimeType) || mimeType === MIME_TYPE.XML_XHTML_APPLICATION;
  }
  var MIME_TYPE = freeze({
    /**
     * `text/html`, the only mime type that triggers treating an XML document as HTML.
     *
     * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/HTML Wikipedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
     * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
     *      WHATWG HTML Spec
     */
    HTML: "text/html",
    /**
     * `application/xml`, the standard mime type for XML documents.
     *
     * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
     *      registration
     * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_APPLICATION: "application/xml",
    /**
     * `text/xml`, an alias for `application/xml`.
     *
     * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
     * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
     * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
     */
    XML_TEXT: "text/xml",
    /**
     * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
     * but is parsed as an XML document.
     *
     * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
     *      registration
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
     * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
     */
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    /**
     * `image/svg+xml`,
     *
     * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
     * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
     * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
     */
    XML_SVG_IMAGE: "image/svg+xml"
  });
  var _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
    return MIME_TYPE[key];
  });
  function isValidMimeType(mimeType) {
    return _MIME_TYPES.indexOf(mimeType) > -1;
  }
  var NAMESPACE = freeze({
    /**
     * The XHTML namespace.
     *
     * @see http://www.w3.org/1999/xhtml
     */
    HTML: "http://www.w3.org/1999/xhtml",
    /**
     * The SVG namespace.
     *
     * @see http://www.w3.org/2000/svg
     */
    SVG: "http://www.w3.org/2000/svg",
    /**
     * The `xml:` namespace.
     *
     * @see http://www.w3.org/XML/1998/namespace
     */
    XML: "http://www.w3.org/XML/1998/namespace",
    /**
     * The `xmlns:` namespace.
     *
     * @see https://www.w3.org/2000/xmlns/
     */
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  conventions.assign = assign;
  conventions.find = find;
  conventions.freeze = freeze;
  conventions.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
  conventions.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
  conventions.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
  conventions.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace;
  conventions.hasOwn = hasOwn;
  conventions.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
  conventions.isHTMLRawTextElement = isHTMLRawTextElement;
  conventions.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement;
  conventions.isHTMLMimeType = isHTMLMimeType;
  conventions.isHTMLVoidElement = isHTMLVoidElement;
  conventions.isValidMimeType = isValidMimeType;
  conventions.MIME_TYPE = MIME_TYPE;
  conventions.NAMESPACE = NAMESPACE;
  return conventions;
}
var errors = {};
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  var conventions2 = requireConventions();
  function extendError(constructor, writableName) {
    constructor.prototype = Object.create(Error.prototype, {
      constructor: { value: constructor },
      name: { value: constructor.name, enumerable: true, writable: writableName }
    });
  }
  var DOMExceptionName = conventions2.freeze({
    /**
     * the default value as defined by the spec
     */
    Error: "Error",
    /**
     * @deprecated
     * Use RangeError instead.
     */
    IndexSizeError: "IndexSizeError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    DomstringSizeError: "DomstringSizeError",
    HierarchyRequestError: "HierarchyRequestError",
    WrongDocumentError: "WrongDocumentError",
    InvalidCharacterError: "InvalidCharacterError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    NoDataAllowedError: "NoDataAllowedError",
    NoModificationAllowedError: "NoModificationAllowedError",
    NotFoundError: "NotFoundError",
    NotSupportedError: "NotSupportedError",
    InUseAttributeError: "InUseAttributeError",
    InvalidStateError: "InvalidStateError",
    SyntaxError: "SyntaxError",
    InvalidModificationError: "InvalidModificationError",
    NamespaceError: "NamespaceError",
    /**
     * @deprecated
     * Use TypeError for invalid arguments,
     * "NotSupportedError" DOMException for unsupported operations,
     * and "NotAllowedError" DOMException for denied requests instead.
     */
    InvalidAccessError: "InvalidAccessError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    ValidationError: "ValidationError",
    /**
     * @deprecated
     * Use TypeError instead.
     */
    TypeMismatchError: "TypeMismatchError",
    SecurityError: "SecurityError",
    NetworkError: "NetworkError",
    AbortError: "AbortError",
    /**
     * @deprecated
     * Just to match the related static code, not part of the spec.
     */
    URLMismatchError: "URLMismatchError",
    QuotaExceededError: "QuotaExceededError",
    TimeoutError: "TimeoutError",
    InvalidNodeTypeError: "InvalidNodeTypeError",
    DataCloneError: "DataCloneError",
    EncodingError: "EncodingError",
    NotReadableError: "NotReadableError",
    UnknownError: "UnknownError",
    ConstraintError: "ConstraintError",
    DataError: "DataError",
    TransactionInactiveError: "TransactionInactiveError",
    ReadOnlyError: "ReadOnlyError",
    VersionError: "VersionError",
    OperationError: "OperationError",
    NotAllowedError: "NotAllowedError",
    OptOutError: "OptOutError"
  });
  var DOMExceptionNames = Object.keys(DOMExceptionName);
  function isValidDomExceptionCode(value) {
    return typeof value === "number" && value >= 1 && value <= 25;
  }
  function endsWithError(value) {
    return typeof value === "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
  }
  function DOMException(messageOrCode, nameOrMessage) {
    if (isValidDomExceptionCode(messageOrCode)) {
      this.name = DOMExceptionNames[messageOrCode];
      this.message = nameOrMessage || "";
    } else {
      this.message = messageOrCode;
      this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error;
    }
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
  }
  extendError(DOMException, true);
  Object.defineProperties(DOMException.prototype, {
    code: {
      enumerable: true,
      get: function() {
        var code = DOMExceptionNames.indexOf(this.name);
        if (isValidDomExceptionCode(code)) return code;
        return 0;
      }
    }
  });
  var ExceptionCode = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  };
  var entries = Object.entries(ExceptionCode);
  for (var i = 0; i < entries.length; i++) {
    var key = entries[i][0];
    DOMException[key] = entries[i][1];
  }
  function ParseError(message, locator) {
    this.message = message;
    this.locator = locator;
    if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
  }
  extendError(ParseError);
  errors.DOMException = DOMException;
  errors.DOMExceptionName = DOMExceptionName;
  errors.ExceptionCode = ExceptionCode;
  errors.ParseError = ParseError;
  return errors;
}
var dom = {};
var grammar = {};
var hasRequiredGrammar;
function requireGrammar() {
  if (hasRequiredGrammar) return grammar;
  hasRequiredGrammar = 1;
  function detectUnicodeSupport(RegExpImpl) {
    try {
      if (typeof RegExpImpl !== "function") {
        RegExpImpl = RegExp;
      }
      var match = new RegExpImpl("𝌆", "u").exec("𝌆");
      return !!match && match[0].length === 2;
    } catch (error) {
    }
    return false;
  }
  var UNICODE_SUPPORT = detectUnicodeSupport();
  function chars(regexp) {
    if (regexp.source[0] !== "[") {
      throw new Error(regexp + " can not be used with chars");
    }
    return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
  }
  function chars_without(regexp, search) {
    if (regexp.source[0] !== "[") {
      throw new Error("/" + regexp.source + "/ can not be used with chars_without");
    }
    if (!search || typeof search !== "string") {
      throw new Error(JSON.stringify(search) + " is not a valid search");
    }
    if (regexp.source.indexOf(search) === -1) {
      throw new Error('"' + search + '" is not is /' + regexp.source + "/");
    }
    if (search === "-" && regexp.source.indexOf(search) !== 1) {
      throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
    }
    return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
  }
  function reg(args) {
    var self = this;
    return new RegExp(
      Array.prototype.slice.call(arguments).map(function(part) {
        var isStr = typeof part === "string";
        if (isStr && self === void 0 && part === "|") {
          throw new Error("use regg instead of reg to wrap expressions with `|`!");
        }
        return isStr ? part : part.source;
      }).join(""),
      UNICODE_SUPPORT ? "mu" : "m"
    );
  }
  function regg(args) {
    if (arguments.length === 0) {
      throw new Error("no parameters provided");
    }
    return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var UNICODE_REPLACEMENT_CHARACTER = "�";
  var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  if (UNICODE_SUPPORT) {
    Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]");
  }
  var _SChar = /[\x20\x09\x0D\x0A]/;
  var SChar_s = chars(_SChar);
  var S = reg(_SChar, "+");
  var S_OPT = reg(_SChar, "*");
  var NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  if (UNICODE_SUPPORT) {
    NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]");
  }
  var NameStartChar_s = chars(NameStartChar);
  var NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]");
  var Name = reg(NameStartChar, NameChar, "*");
  var Nmtoken = reg(NameChar, "+");
  var EntityRef = reg("&", Name, ";");
  var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);
  var Reference = regg(EntityRef, "|", CharRef);
  var PEReference = reg("%", Name, ";");
  var EntityValue = regg(
    reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'),
    "|",
    reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'")
  );
  var AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'");
  var NCNameStartChar = chars_without(NameStartChar, ":");
  var NCNameChar = chars_without(NameChar, ":");
  var NCName = reg(NCNameStartChar, NCNameChar, "*");
  var QName = reg(NCName, regg(":", NCName), "?");
  var QName_exact = reg("^", QName, "$");
  var QName_group = reg("(", QName, ")");
  var SystemLiteral = regg(/"[^"]*"|'[^']*'/);
  var PI = reg(/^<\?/, "(", Name, ")", regg(S, "(", Char, "*?)"), "?", /\?>/);
  var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;
  var PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'");
  var COMMENT_START = "<!--";
  var COMMENT_END = "-->";
  var Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END);
  var PCDATA = "#PCDATA";
  var Mixed = regg(
    reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/),
    "|",
    reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/)
  );
  var _children_quantity = /[?*+]?/;
  var children = reg(
    /\([^>]+\)/,
    _children_quantity
    /*regg(choice, '|', seq), _children_quantity*/
  );
  var contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children);
  var ELEMENTDECL_START = "<!ELEMENT";
  var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">");
  var NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/);
  var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/);
  var EnumeratedType = regg(NotationType, "|", Enumeration);
  var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType);
  var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue));
  var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);
  var ATTLIST_DECL_START = "<!ATTLIST";
  var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">");
  var ABOUT_LEGACY_COMPAT = "about:legacy-compat";
  var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'");
  var SYSTEM = "SYSTEM";
  var PUBLIC = "PUBLIC";
  var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
  var ExternalID_match = reg(
    "^",
    regg(
      regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"),
      "|",
      regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")
    )
  );
  var NDataDecl = regg(S, "NDATA", S, Name);
  var EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?"));
  var ENTITY_DECL_START = "<!ENTITY";
  var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">");
  var PEDef = regg(EntityValue, "|", ExternalID);
  var PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">");
  var EntityDecl = regg(GEDecl, "|", PEDecl);
  var PublicID = reg(PUBLIC, S, PubidLiteral);
  var NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">");
  var Eq = reg(S_OPT, "=", S_OPT);
  var VersionNum = /1[.]\d+/;
  var VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"'));
  var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
  var EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'"));
  var SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"'));
  var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/);
  var DOCTYPE_DECL_START = "<!DOCTYPE";
  var CDATA_START = "<![CDATA[";
  var CDATA_END = "]]>";
  var CDStart = /<!\[CDATA\[/;
  var CDEnd = /\]\]>/;
  var CData = reg(Char, "*?", CDEnd);
  var CDSect = reg(CDStart, CData);
  grammar.chars = chars;
  grammar.chars_without = chars_without;
  grammar.detectUnicodeSupport = detectUnicodeSupport;
  grammar.reg = reg;
  grammar.regg = regg;
  grammar.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
  grammar.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
  grammar.AttlistDecl = AttlistDecl;
  grammar.CDATA_START = CDATA_START;
  grammar.CDATA_END = CDATA_END;
  grammar.CDSect = CDSect;
  grammar.Char = Char;
  grammar.Comment = Comment;
  grammar.COMMENT_START = COMMENT_START;
  grammar.COMMENT_END = COMMENT_END;
  grammar.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
  grammar.elementdecl = elementdecl;
  grammar.EntityDecl = EntityDecl;
  grammar.EntityValue = EntityValue;
  grammar.ExternalID = ExternalID;
  grammar.ExternalID_match = ExternalID_match;
  grammar.Name = Name;
  grammar.NotationDecl = NotationDecl;
  grammar.Reference = Reference;
  grammar.PEReference = PEReference;
  grammar.PI = PI;
  grammar.PUBLIC = PUBLIC;
  grammar.PubidLiteral = PubidLiteral;
  grammar.QName = QName;
  grammar.QName_exact = QName_exact;
  grammar.QName_group = QName_group;
  grammar.S = S;
  grammar.SChar_s = SChar_s;
  grammar.S_OPT = S_OPT;
  grammar.SYSTEM = SYSTEM;
  grammar.SystemLiteral = SystemLiteral;
  grammar.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
  grammar.UNICODE_SUPPORT = UNICODE_SUPPORT;
  grammar.XMLDecl = XMLDecl;
  return grammar;
}
var hasRequiredDom;
function requireDom() {
  if (hasRequiredDom) return dom;
  hasRequiredDom = 1;
  var conventions2 = requireConventions();
  var find = conventions2.find;
  var hasDefaultHTMLNamespace = conventions2.hasDefaultHTMLNamespace;
  var hasOwn = conventions2.hasOwn;
  var isHTMLMimeType = conventions2.isHTMLMimeType;
  var isHTMLRawTextElement = conventions2.isHTMLRawTextElement;
  var isHTMLVoidElement = conventions2.isHTMLVoidElement;
  var MIME_TYPE = conventions2.MIME_TYPE;
  var NAMESPACE = conventions2.NAMESPACE;
  var PDC = Symbol();
  var errors2 = requireErrors();
  var DOMException = errors2.DOMException;
  var DOMExceptionName = errors2.DOMExceptionName;
  var g = requireGrammar();
  function checkSymbol(symbol) {
    if (symbol !== PDC) {
      throw new TypeError("Illegal constructor");
    }
  }
  function notEmptyString(input) {
    return input !== "";
  }
  function splitOnASCIIWhitespace(input) {
    return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
  }
  function orderedSetReducer(current, element) {
    if (!hasOwn(current, element)) {
      current[element] = true;
    }
    return current;
  }
  function toOrderedSet(input) {
    if (!input) return [];
    var list = splitOnASCIIWhitespace(input);
    return Object.keys(list.reduce(orderedSetReducer, {}));
  }
  function arrayIncludes(list) {
    return function(element) {
      return list && list.indexOf(element) !== -1;
    };
  }
  function validateQualifiedName(qualifiedName) {
    if (!g.QName_exact.test(qualifiedName)) {
      throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
    }
  }
  function validateAndExtract(namespace, qualifiedName) {
    validateQualifiedName(qualifiedName);
    namespace = namespace || null;
    var prefix = null;
    var localName = qualifiedName;
    if (qualifiedName.indexOf(":") >= 0) {
      var splitResult = qualifiedName.split(":");
      prefix = splitResult[0];
      localName = splitResult[1];
    }
    if (prefix !== null && namespace === null) {
      throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    }
    if (prefix === "xml" && namespace !== conventions2.NAMESPACE.XML) {
      throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    }
    if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions2.NAMESPACE.XMLNS) {
      throw new DOMException(
        DOMException.NAMESPACE_ERR,
        'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
      );
    }
    if (namespace === conventions2.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns") {
      throw new DOMException(
        DOMException.NAMESPACE_ERR,
        'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
      );
    }
    return [namespace, prefix, localName];
  }
  function copy(src, dest) {
    for (var p in src) {
      if (hasOwn(src, p)) {
        dest[p] = src[p];
      }
    }
  }
  function _extends(Class, Super) {
    var pt = Class.prototype;
    if (!(pt instanceof Super)) {
      let t2 = function() {
      };
      var t = t2;
      t2.prototype = Super.prototype;
      t2 = new t2();
      copy(pt, t2);
      Class.prototype = pt = t2;
    }
    if (pt.constructor != Class) {
      if (typeof Class != "function") {
        console.error("unknown Class:" + Class);
      }
      pt.constructor = Class;
    }
  }
  var NodeType = {};
  var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
  var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
  var TEXT_NODE = NodeType.TEXT_NODE = 3;
  var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
  var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
  var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
  var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
  var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
  var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
  var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
  var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
  var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
  var DocumentPosition = conventions2.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function commonAncestor(a, b) {
    if (b.length < a.length) return commonAncestor(b, a);
    var c = null;
    for (var n in a) {
      if (a[n] !== b[n]) return c;
      c = a[n];
    }
    return c;
  }
  function docGUID(doc) {
    if (!doc.guid) doc.guid = Math.random();
    return doc.guid;
  }
  function NodeList() {
  }
  NodeList.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1
     * inclusive.
     *
     * @type {number}
     */
    length: 0,
    /**
     * Returns the item at `index`. If index is greater than or equal to the number of nodes in
     * the list, this returns null.
     *
     * @param index
     * Unsigned long Index into the collection.
     * @returns {Node | null}
     * The node at position `index` in the NodeList,
     * or null if that is not a valid index.
     */
    item: function(index) {
      return index >= 0 && index < this.length ? this[index] : null;
    },
    /**
     * Returns a string representation of the NodeList.
     *
     * @param {unknown} nodeFilter
     * __A filter function? Not implemented according to the spec?__.
     * @returns {string}
     * A string representation of the NodeList.
     */
    toString: function(nodeFilter) {
      for (var buf = [], i = 0; i < this.length; i++) {
        serializeToString(this[i], buf, nodeFilter);
      }
      return buf.join("");
    },
    /**
     * Filters the NodeList based on a predicate.
     *
     * @param {function(Node): boolean} predicate
     * - A predicate function to filter the NodeList.
     * @returns {Node[]}
     * An array of nodes that satisfy the predicate.
     * @private
     */
    filter: function(predicate) {
      return Array.prototype.filter.call(this, predicate);
    },
    /**
     * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
     * not present.
     *
     * @param {Node} item
     * - The Node item to locate in the NodeList.
     * @returns {number}
     * The first index of the node in the NodeList; -1 if not found.
     * @private
     */
    indexOf: function(item) {
      return Array.prototype.indexOf.call(this, item);
    }
  };
  NodeList.prototype[Symbol.iterator] = function() {
    var me = this;
    var index = 0;
    return {
      next: function() {
        if (index < me.length) {
          return {
            value: me[index++],
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      },
      return: function() {
        return {
          done: true
        };
      }
    };
  };
  function LiveNodeList(node, refresh) {
    this._node = node;
    this._refresh = refresh;
    _updateLiveList(this);
  }
  function _updateLiveList(list) {
    var inc = list._node._inc || list._node.ownerDocument._inc;
    if (list._inc !== inc) {
      var ls = list._refresh(list._node);
      __set__(list, "length", ls.length);
      if (!list.$$length || ls.length < list.$$length) {
        for (var i = ls.length; i in list; i++) {
          if (hasOwn(list, i)) {
            delete list[i];
          }
        }
      }
      copy(ls, list);
      list._inc = inc;
    }
  }
  LiveNodeList.prototype.item = function(i) {
    _updateLiveList(this);
    return this[i] || null;
  };
  _extends(LiveNodeList, NodeList);
  function NamedNodeMap() {
  }
  function _findNodeIndex(list, node) {
    var i = 0;
    while (i < list.length) {
      if (list[i] === node) {
        return i;
      }
      i++;
    }
  }
  function _addNamedNode(el, list, newAttr, oldAttr) {
    if (oldAttr) {
      list[_findNodeIndex(list, oldAttr)] = newAttr;
    } else {
      list[list.length] = newAttr;
      list.length++;
    }
    if (el) {
      newAttr.ownerElement = el;
      var doc = el.ownerDocument;
      if (doc) {
        oldAttr && _onRemoveAttribute(doc, el, oldAttr);
        _onAddAttribute(doc, el, newAttr);
      }
    }
  }
  function _removeNamedNode(el, list, attr) {
    var i = _findNodeIndex(list, attr);
    if (i >= 0) {
      var lastIndex = list.length - 1;
      while (i <= lastIndex) {
        list[i] = list[++i];
      }
      list.length = lastIndex;
      if (el) {
        var doc = el.ownerDocument;
        if (doc) {
          _onRemoveAttribute(doc, el, attr);
        }
        attr.ownerElement = null;
      }
    }
  }
  NamedNodeMap.prototype = {
    length: 0,
    item: NodeList.prototype.item,
    /**
     * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
     * document.
     *
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given local name, or null if no such attribute exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
     */
    getNamedItem: function(localName) {
      if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
        localName = localName.toLowerCase();
      }
      var i = 0;
      while (i < this.length) {
        var attr = this[i];
        if (attr.nodeName === localName) {
          return attr;
        }
        i++;
      }
      return null;
    },
    /**
     * Set an attribute.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * With code:
     * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
     * element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItem: function(attr) {
      var el = attr.ownerElement;
      if (el && el !== this._ownerElement) {
        throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
      }
      var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
      if (oldAttr === attr) {
        return attr;
      }
      _addNamedNode(this._ownerElement, this, attr, oldAttr);
      return oldAttr;
    },
    /**
     * Set an attribute, replacing an existing attribute with the same local name and namespace
     * URI if one exists.
     *
     * @param {Attr} attr
     * The attribute to set.
     * @returns {Attr | null}
     * The old attribute with the same local name and namespace URI as the new one, or null if no
     * such attribute exists.
     * @throws {DOMException}
     * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
     * attribute of another element.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
     */
    setNamedItemNS: function(attr) {
      return this.setNamedItem(attr);
    },
    /**
     * Removes an attribute specified by the local name.
     *
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
     */
    removeNamedItem: function(localName) {
      var attr = this.getNamedItem(localName);
      if (!attr) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
      }
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    /**
     * Removes an attribute specified by the namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute to be removed.
     * @param {string} localName
     * The local name of the attribute to be removed.
     * @returns {Attr}
     * The attribute node that was removed.
     * @throws {DOMException}
     * With code:
     * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
     * name is found.
     * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
     */
    removeNamedItemNS: function(namespaceURI, localName) {
      var attr = this.getNamedItemNS(namespaceURI, localName);
      if (!attr) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
      }
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    /**
     * Get an attribute by namespace and local name.
     *
     * @param {string | null} namespaceURI
     * The namespace URI of the attribute.
     * @param {string} localName
     * The local name of the attribute.
     * @returns {Attr | null}
     * The attribute with the given namespace URI and local name, or null if no such attribute
     * exists.
     * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
     */
    getNamedItemNS: function(namespaceURI, localName) {
      if (!namespaceURI) {
        namespaceURI = null;
      }
      var i = 0;
      while (i < this.length) {
        var node = this[i];
        if (node.localName === localName && node.namespaceURI === namespaceURI) {
          return node;
        }
        i++;
      }
      return null;
    }
  };
  NamedNodeMap.prototype[Symbol.iterator] = function() {
    var me = this;
    var index = 0;
    return {
      next: function() {
        if (index < me.length) {
          return {
            value: me[index++],
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      },
      return: function() {
        return {
          done: true
        };
      }
    };
  };
  function DOMImplementation() {
  }
  DOMImplementation.prototype = {
    /**
     * Test if the DOM implementation implements a specific feature and version, as specified in
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
     *
     * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
     * feature is supported. The different implementations fairly diverged in what kind of
     * features were reported. The latest version of the spec settled to force this method to
     * always return true, where the functionality was accurate and in use.
     *
     * @deprecated
     * It is deprecated and modern browsers return true in all cases.
     * @function DOMImplementation#hasFeature
     * @param {string} feature
     * The name of the feature to test.
     * @param {string} [version]
     * This is the version number of the feature to test.
     * @returns {boolean}
     * Always returns true.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
     * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
     */
    hasFeature: function(feature, version) {
      return true;
    },
    /**
     * Creates a DOM Document object of the specified type with its document element. Note that
     * based on the {@link DocumentType}
     * given to create the document, the implementation may instantiate specialized
     * {@link Document} objects that support additional features than the "Core", such as "HTML"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
     * On the other hand, setting the {@link DocumentType} after the document was created makes
     * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
     * such as createHTMLDocument
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
     * can be used to obtain specific types of {@link Document} objects.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - There is no interface/class `XMLDocument`, it returns a `Document`
     * instance (with it's `type` set to `'xml'`).
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @function DOMImplementation.createDocument
     * @param {string | null} namespaceURI
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
     * of the document element to create or null.
     * @param {string | null} qualifiedName
     * The
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
     * of the document element to be created or null.
     * @param {DocumentType | null} [doctype=null]
     * The type of document to be created or null. When doctype is not null, its
     * {@link Node#ownerDocument} attribute is set to the document being created. Default is
     * `null`
     * @returns {Document}
     * A new {@link Document} object with its document element. If the NamespaceURI,
     * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
     * document element.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
     * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
     * is different from null, or if the qualifiedName has a prefix that is "xml" and the
     * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
     * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
     * or if the DOM implementation does not support the "XML" feature but a non-null namespace
     * URI was provided, since namespaces were defined by XML.
     * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
     * or was created from a different implementation.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see {@link #createHTMLDocument}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
     *      Level 2 Core (initial)
     */
    createDocument: function(namespaceURI, qualifiedName, doctype) {
      var contentType = MIME_TYPE.XML_APPLICATION;
      if (namespaceURI === NAMESPACE.HTML) {
        contentType = MIME_TYPE.XML_XHTML_APPLICATION;
      } else if (namespaceURI === NAMESPACE.SVG) {
        contentType = MIME_TYPE.XML_SVG_IMAGE;
      }
      var doc = new Document(PDC, { contentType });
      doc.implementation = this;
      doc.childNodes = new NodeList();
      doc.doctype = doctype || null;
      if (doctype) {
        doc.appendChild(doctype);
      }
      if (qualifiedName) {
        var root = doc.createElementNS(namespaceURI, qualifiedName);
        doc.appendChild(root);
      }
      return doc;
    },
    /**
     * Creates an empty DocumentType node. Entity declarations and notations are not made
     * available. Entity reference expansions and default attribute additions do not occur.
     *
     * **This behavior is slightly different from the one in the specs**:
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     * - `publicId` and `systemId` contain the raw data including any possible quotes,
     *   so they can always be serialized back to the original value
     * - `internalSubset` contains the raw string between `[` and `]` if present,
     *   but is not parsed or validated in any form.
     *
     * @function DOMImplementation#createDocumentType
     * @param {string} qualifiedName
     * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
     * name} of the document type to be created.
     * @param {string} [publicId]
     * The external subset public identifier.
     * @param {string} [systemId]
     * The external subset system identifier.
     * @param {string} [internalSubset]
     * the internal subset or an empty string if it is not present
     * @returns {DocumentType}
     * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
     * @throws {DOMException}
     * With code:
     *
     * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
     * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
     * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
     * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
     * "XML" and the language exposed through the Document does not support XML Namespaces (such
     * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
     * @since DOM Level 2.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
     *      MDN
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
     *      Standard
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
     *      Level 3 Core
     * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
     *      Level 2 Core
     * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
     * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
     * @prettierignore
     */
    createDocumentType: function(qualifiedName, publicId, systemId, internalSubset) {
      validateQualifiedName(qualifiedName);
      var node = new DocumentType(PDC);
      node.name = qualifiedName;
      node.nodeName = qualifiedName;
      node.publicId = publicId || "";
      node.systemId = systemId || "";
      node.internalSubset = internalSubset || "";
      node.childNodes = new NodeList();
      return node;
    },
    /**
     * Returns an HTML document, that might already have a basic DOM structure.
     *
     * __It behaves slightly different from the description in the living standard__:
     * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
     * omitted)
     * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
     *
     * @param {string | false} [title]
     * A string containing the title to give the new HTML document.
     * @returns {Document}
     * The HTML document.
     * @since WHATWG Living Standard.
     * @see {@link #createDocument}
     * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
     * @see https://dom.spec.whatwg.org/#html-document
     */
    createHTMLDocument: function(title) {
      var doc = new Document(PDC, { contentType: MIME_TYPE.HTML });
      doc.implementation = this;
      doc.childNodes = new NodeList();
      if (title !== false) {
        doc.doctype = this.createDocumentType("html");
        doc.doctype.ownerDocument = doc;
        doc.appendChild(doc.doctype);
        var htmlNode = doc.createElement("html");
        doc.appendChild(htmlNode);
        var headNode = doc.createElement("head");
        htmlNode.appendChild(headNode);
        if (typeof title === "string") {
          var titleNode = doc.createElement("title");
          titleNode.appendChild(doc.createTextNode(title));
          headNode.appendChild(titleNode);
        }
        htmlNode.appendChild(doc.createElement("body"));
      }
      return doc;
    }
  };
  function Node(symbol) {
    checkSymbol(symbol);
  }
  Node.prototype = {
    /**
     * The first child of this node.
     *
     * @type {Node | null}
     */
    firstChild: null,
    /**
     * The last child of this node.
     *
     * @type {Node | null}
     */
    lastChild: null,
    /**
     * The previous sibling of this node.
     *
     * @type {Node | null}
     */
    previousSibling: null,
    /**
     * The next sibling of this node.
     *
     * @type {Node | null}
     */
    nextSibling: null,
    /**
     * The parent node of this node.
     *
     * @type {Node | null}
     */
    parentNode: null,
    /**
     * The parent element of this node.
     *
     * @type {Element | null}
     */
    get parentElement() {
      return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
    },
    /**
     * The child nodes of this node.
     *
     * @type {NodeList}
     */
    childNodes: null,
    /**
     * The document object associated with this node.
     *
     * @type {Document | null}
     */
    ownerDocument: null,
    /**
     * The value of this node.
     *
     * @type {string | null}
     */
    nodeValue: null,
    /**
     * The namespace URI of this node.
     *
     * @type {string | null}
     */
    namespaceURI: null,
    /**
     * The prefix of the namespace for this node.
     *
     * @type {string | null}
     */
    prefix: null,
    /**
     * The local part of the qualified name of this node.
     *
     * @type {string | null}
     */
    localName: null,
    /**
     * The baseURI is currently always `about:blank`,
     * since that's what happens when you create a document from scratch.
     *
     * @type {'about:blank'}
     */
    baseURI: "about:blank",
    /**
     * Is true if this node is part of a document.
     *
     * @type {boolean}
     */
    get isConnected() {
      var rootNode = this.getRootNode();
      return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
    },
    /**
     * Checks whether `other` is an inclusive descendant of this node.
     *
     * @param {Node | null | undefined} other
     * The node to check.
     * @returns {boolean}
     * True if `other` is an inclusive descendant of this node; false otherwise.
     * @see https://dom.spec.whatwg.org/#dom-node-contains
     */
    contains: function(other) {
      if (!other) return false;
      var parent = other;
      do {
        if (this === parent) return true;
        parent = other.parentNode;
      } while (parent);
      return false;
    },
    /**
     * @typedef GetRootNodeOptions
     * @property {boolean} [composed=false]
     */
    /**
     * Searches for the root node of this node.
     *
     * **This behavior is slightly different from the in the specs**:
     * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
     *
     * @param {GetRootNodeOptions} [options]
     * @returns {Node}
     * Root node.
     * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
     * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
     */
    getRootNode: function(options) {
      var parent = this;
      do {
        if (!parent.parentNode) {
          return parent;
        }
        parent = parent.parentNode;
      } while (parent);
    },
    /**
     * Checks whether the given node is equal to this node.
     *
     * @param {Node} [otherNode]
     * @see https://dom.spec.whatwg.org/#concept-node-equals
     */
    isEqualNode: function(otherNode) {
      if (!otherNode) return false;
      if (this.nodeType !== otherNode.nodeType) return false;
      switch (this.nodeType) {
        case this.DOCUMENT_TYPE_NODE:
          if (this.name !== otherNode.name) return false;
          if (this.publicId !== otherNode.publicId) return false;
          if (this.systemId !== otherNode.systemId) return false;
          break;
        case this.ELEMENT_NODE:
          if (this.namespaceURI !== otherNode.namespaceURI) return false;
          if (this.prefix !== otherNode.prefix) return false;
          if (this.localName !== otherNode.localName) return false;
          if (this.attributes.length !== otherNode.attributes.length) return false;
          for (var i = 0; i < this.attributes.length; i++) {
            var attr = this.attributes.item(i);
            if (!attr.isEqualNode(otherNode.getAttributeNodeNS(attr.namespaceURI, attr.localName))) {
              return false;
            }
          }
          break;
        case this.ATTRIBUTE_NODE:
          if (this.namespaceURI !== otherNode.namespaceURI) return false;
          if (this.localName !== otherNode.localName) return false;
          if (this.value !== otherNode.value) return false;
          break;
        case this.PROCESSING_INSTRUCTION_NODE:
          if (this.target !== otherNode.target || this.data !== otherNode.data) {
            return false;
          }
          break;
        case this.TEXT_NODE:
        case this.COMMENT_NODE:
          if (this.data !== otherNode.data) return false;
          break;
      }
      if (this.childNodes.length !== otherNode.childNodes.length) {
        return false;
      }
      for (var i = 0; i < this.childNodes.length; i++) {
        if (!this.childNodes[i].isEqualNode(otherNode.childNodes[i])) {
          return false;
        }
      }
      return true;
    },
    /**
     * Checks whether or not the given node is this node.
     *
     * @param {Node} [otherNode]
     */
    isSameNode: function(otherNode) {
      return this === otherNode;
    },
    /**
     * Inserts a node before a reference node as a child of this node.
     *
     * @param {Node} newChild
     * The new child node to be inserted.
     * @param {Node | null} refChild
     * The reference node before which newChild will be inserted.
     * @returns {Node}
     * The new child node successfully inserted.
     * @throws {DOMException}
     * Throws a DOMException if inserting the node would result in a DOM tree that is not
     * well-formed, or if `child` is provided but is not a child of `parent`.
     * See {@link _insertBefore} for more details.
     * @since Modified in DOM L2
     */
    insertBefore: function(newChild, refChild) {
      return _insertBefore(this, newChild, refChild);
    },
    /**
     * Replaces an old child node with a new child node within this node.
     *
     * @param {Node} newChild
     * The new node that is to replace the old node.
     * If it already exists in the DOM, it is removed from its original position.
     * @param {Node} oldChild
     * The existing child node to be replaced.
     * @returns {Node}
     * Returns the replaced child node.
     * @throws {DOMException}
     * Throws a DOMException if replacing the node would result in a DOM tree that is not
     * well-formed, or if `oldChild` is not a child of `this`.
     * This can also occur if the pre-replacement validity assertion fails.
     * See {@link _insertBefore}, {@link Node.removeChild}, and
     * {@link assertPreReplacementValidityInDocument} for more details.
     * @see https://dom.spec.whatwg.org/#concept-node-replace
     */
    replaceChild: function(newChild, oldChild) {
      _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
      if (oldChild) {
        this.removeChild(oldChild);
      }
    },
    /**
     * Removes an existing child node from this node.
     *
     * @param {Node} oldChild
     * The child node to be removed.
     * @returns {Node}
     * Returns the removed child node.
     * @throws {DOMException}
     * Throws a DOMException if `oldChild` is not a child of `this`.
     * See {@link _removeChild} for more details.
     */
    removeChild: function(oldChild) {
      return _removeChild(this, oldChild);
    },
    /**
     * Appends a child node to this node.
     *
     * @param {Node} newChild
     * The child node to be appended to this node.
     * If it already exists in the DOM, it is removed from its original position.
     * @returns {Node}
     * Returns the appended child node.
     * @throws {DOMException}
     * Throws a DOMException if appending the node would result in a DOM tree that is not
     * well-formed, or if `newChild` is not a valid Node.
     * See {@link insertBefore} for more details.
     */
    appendChild: function(newChild) {
      return this.insertBefore(newChild, null);
    },
    /**
     * Determines whether this node has any child nodes.
     *
     * @returns {boolean}
     * Returns true if this node has any child nodes, and false otherwise.
     */
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    /**
     * Creates a copy of the calling node.
     *
     * @param {boolean} deep
     * If true, the contents of the node are recursively copied.
     * If false, only the node itself (and its attributes, if it is an element) are copied.
     * @returns {Node}
     * Returns the newly created copy of the node.
     * @throws {DOMException}
     * May throw a DOMException if operations within {@link Element#setAttributeNode} or
     * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
     * specific constraints.
     * @see {@link cloneNode}
     */
    cloneNode: function(deep) {
      return cloneNode(this.ownerDocument || this, this, deep);
    },
    /**
     * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
     * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
     *
     * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
     * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
     * nodes.
     *
     * This method operates recursively, so it also normalizes any and all descendent nodes within
     * the subtree.
     *
     * @throws {DOMException}
     * May throw a DOMException if operations within removeChild or appendData (which are
     * potentially invoked in this method) do not meet their specific constraints.
     * @since Modified in DOM Level 2
     * @see {@link Node.removeChild}
     * @see {@link CharacterData.appendData}
     */
    normalize: function() {
      var child = this.firstChild;
      while (child) {
        var next = child.nextSibling;
        if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
          this.removeChild(next);
          child.appendData(next.data);
        } else {
          child.normalize();
          child = next;
        }
      }
    },
    /**
     * Checks whether the DOM implementation implements a specific feature and its version.
     *
     * @deprecated
     * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
     * @param {string} feature
     * The package name of the feature to test. This is the same name that can be passed to the
     * method `hasFeature` on `DOMImplementation`.
     * @param {string} version
     * This is the version number of the package name to test.
     * @returns {boolean}
     * Returns true in all cases in the current implementation.
     * @since Introduced in DOM Level 2
     * @see {@link DOMImplementation.hasFeature}
     */
    isSupported: function(feature, version) {
      return this.ownerDocument.implementation.hasFeature(feature, version);
    },
    /**
     * Look up the prefix associated to the given namespace URI, starting from this node.
     * **The default namespace declarations are ignored by this method.**
     * See Namespace Prefix Lookup for details on the algorithm used by this method.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI for which to find the associated prefix.
     * @returns {string | null}
     * The associated prefix, if found; otherwise, null.
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
     * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
     * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
     * @see https://github.com/xmldom/xmldom/issues/322
     * @prettierignore
     */
    lookupPrefix: function(namespaceURI) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          for (var n in map) {
            if (hasOwn(map, n) && map[n] === namespaceURI) {
              return n;
            }
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    /**
     * This function is used to look up the namespace URI associated with the given prefix,
     * starting from this node.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} prefix
     * The prefix for which to find the associated namespace URI.
     * @returns {string | null}
     * The associated namespace URI, if found; otherwise, null.
     * @since DOM Level 3
     * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
     * @prettierignore
     */
    lookupNamespaceURI: function(prefix) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          if (hasOwn(map, prefix)) {
            return map[prefix];
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    /**
     * Determines whether the given namespace URI is the default namespace.
     *
     * The function works by looking up the prefix associated with the given namespace URI. If no
     * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
     * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
     * the default.
     *
     * **This behavior is different from the in the specs**:
     * - no node type specific handling
     * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
     *
     * @param {string | null} namespaceURI
     * The namespace URI to be checked.
     * @returns {boolean}
     * Returns true if the given namespace URI is the default namespace, false otherwise.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
     * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
     * @prettierignore
     */
    isDefaultNamespace: function(namespaceURI) {
      var prefix = this.lookupPrefix(namespaceURI);
      return prefix == null;
    },
    /**
     * Compares the reference node with a node with regard to their position in the document and
     * according to the document order.
     *
     * @param {Node} other
     * The node to compare the reference node to.
     * @returns {number}
     * Returns how the node is positioned relatively to the reference node according to the
     * bitmask. 0 if reference node and given node are the same.
     * @since DOM Level 3
     * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
     * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
     */
    compareDocumentPosition: function(other) {
      if (this === other) return 0;
      var node1 = other;
      var node2 = this;
      var attr1 = null;
      var attr2 = null;
      if (node1 instanceof Attr) {
        attr1 = node1;
        node1 = attr1.ownerElement;
      }
      if (node2 instanceof Attr) {
        attr2 = node2;
        node2 = attr2.ownerElement;
        if (attr1 && node1 && node2 === node1) {
          for (var i = 0, attr; attr = node2.attributes[i]; i++) {
            if (attr === attr1)
              return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
            if (attr === attr2)
              return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          }
        }
      }
      if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
        return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
      }
      if (attr2 && node1 === node2) {
        return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
      }
      if (attr1 && node1 === node2) {
        return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
      }
      var chain1 = [];
      var ancestor1 = node1.parentNode;
      while (ancestor1) {
        if (!attr2 && ancestor1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        }
        chain1.push(ancestor1);
        ancestor1 = ancestor1.parentNode;
      }
      chain1.reverse();
      var chain2 = [];
      var ancestor2 = node2.parentNode;
      while (ancestor2) {
        if (!attr1 && ancestor2 === node1) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        chain2.push(ancestor2);
        ancestor2 = ancestor2.parentNode;
      }
      chain2.reverse();
      var ca = commonAncestor(chain1, chain2);
      for (var n in ca.childNodes) {
        var child = ca.childNodes[n];
        if (child === node2) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        if (child === node1) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        if (chain2.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        if (chain1.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function _xmlEncoder(c) {
    return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
  }
  copy(NodeType, Node);
  copy(NodeType, Node.prototype);
  copy(DocumentPosition, Node);
  copy(DocumentPosition, Node.prototype);
  function _visitNode(node, callback) {
    if (callback(node)) {
      return true;
    }
    if (node = node.firstChild) {
      do {
        if (_visitNode(node, callback)) {
          return true;
        }
      } while (node = node.nextSibling);
    }
  }
  function Document(symbol, options) {
    checkSymbol(symbol);
    var opt = options || {};
    this.ownerDocument = this;
    this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION;
    this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
  }
  function _onAddAttribute(doc, el, newAttr) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE.XMLNS) {
      el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
    }
  }
  function _onRemoveAttribute(doc, el, newAttr, remove) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE.XMLNS) {
      delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
    }
  }
  function _onUpdateChild(doc, parent, newChild) {
    if (doc && doc._inc) {
      doc._inc++;
      var childNodes = parent.childNodes;
      if (newChild && !newChild.nextSibling) {
        childNodes[childNodes.length++] = newChild;
      } else {
        var child = parent.firstChild;
        var i = 0;
        while (child) {
          childNodes[i++] = child;
          child = child.nextSibling;
        }
        childNodes.length = i;
        delete childNodes[childNodes.length];
      }
    }
  }
  function _removeChild(parentNode, child) {
    if (parentNode !== child.parentNode) {
      throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
    }
    var oldPreviousSibling = child.previousSibling;
    var oldNextSibling = child.nextSibling;
    if (oldPreviousSibling) {
      oldPreviousSibling.nextSibling = oldNextSibling;
    } else {
      parentNode.firstChild = oldNextSibling;
    }
    if (oldNextSibling) {
      oldNextSibling.previousSibling = oldPreviousSibling;
    } else {
      parentNode.lastChild = oldPreviousSibling;
    }
    _onUpdateChild(parentNode.ownerDocument, parentNode);
    child.parentNode = null;
    child.previousSibling = null;
    child.nextSibling = null;
    return child;
  }
  function hasValidParentNodeType(node) {
    return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
  }
  function hasInsertableNodeType(node) {
    return node && (node.nodeType === Node.CDATA_SECTION_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_TYPE_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node.TEXT_NODE);
  }
  function isDocTypeNode(node) {
    return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
  }
  function isElementNode(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
  }
  function isTextNode(node) {
    return node && node.nodeType === Node.TEXT_NODE;
  }
  function isElementInsertionPossible(doc, child) {
    var parentChildNodes = doc.childNodes || [];
    if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
      return false;
    }
    var docTypeNode = find(parentChildNodes, isDocTypeNode);
    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
  }
  function isElementReplacementPossible(doc, child) {
    var parentChildNodes = doc.childNodes || [];
    function hasElementChildThatIsNotChild(node) {
      return isElementNode(node) && node !== child;
    }
    if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
      return false;
    }
    var docTypeNode = find(parentChildNodes, isDocTypeNode);
    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
  }
  function assertPreInsertionValidity1to5(parent, node, child) {
    if (!hasValidParentNodeType(parent)) {
      throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
    }
    if (child && child.parentNode !== parent) {
      throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
    }
    if (
      // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
      !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
      // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
      // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
      // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
      isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
    ) {
      throw new DOMException(
        DOMException.HIERARCHY_REQUEST_ERR,
        "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
      );
    }
  }
  function assertPreInsertionValidityInDocument(parent, node, child) {
    var parentChildNodes = parent.childNodes || [];
    var nodeChildNodes = node.childNodes || [];
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      var nodeChildElements = nodeChildNodes.filter(isElementNode);
      if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      }
      if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
      }
    }
    if (isElementNode(node)) {
      if (!isElementInsertionPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
      }
    }
    if (isDocTypeNode(node)) {
      if (find(parentChildNodes, isDocTypeNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      }
      var parentElementChild = find(parentChildNodes, isElementNode);
      if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      }
      if (!child && parentElementChild) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
      }
    }
  }
  function assertPreReplacementValidityInDocument(parent, node, child) {
    var parentChildNodes = parent.childNodes || [];
    var nodeChildNodes = node.childNodes || [];
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      var nodeChildElements = nodeChildNodes.filter(isElementNode);
      if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      }
      if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
      }
    }
    if (isElementNode(node)) {
      if (!isElementReplacementPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
      }
    }
    if (isDocTypeNode(node)) {
      let hasDoctypeChildThatIsNotChild2 = function(node2) {
        return isDocTypeNode(node2) && node2 !== child;
      };
      var hasDoctypeChildThatIsNotChild = hasDoctypeChildThatIsNotChild2;
      if (find(parentChildNodes, hasDoctypeChildThatIsNotChild2)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      }
      var parentElementChild = find(parentChildNodes, isElementNode);
      if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      }
    }
  }
  function _insertBefore(parent, node, child, _inDocumentAssertion) {
    assertPreInsertionValidity1to5(parent, node, child);
    if (parent.nodeType === Node.DOCUMENT_NODE) {
      (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
    }
    var cp = node.parentNode;
    if (cp) {
      cp.removeChild(node);
    }
    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
      var newFirst = node.firstChild;
      if (newFirst == null) {
        return node;
      }
      var newLast = node.lastChild;
    } else {
      newFirst = newLast = node;
    }
    var pre = child ? child.previousSibling : parent.lastChild;
    newFirst.previousSibling = pre;
    newLast.nextSibling = child;
    if (pre) {
      pre.nextSibling = newFirst;
    } else {
      parent.firstChild = newFirst;
    }
    if (child == null) {
      parent.lastChild = newLast;
    } else {
      child.previousSibling = newLast;
    }
    do {
      newFirst.parentNode = parent;
    } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
    _onUpdateChild(parent.ownerDocument || parent, parent, node);
    if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
      node.firstChild = node.lastChild = null;
    }
    return node;
  }
  Document.prototype = {
    /**
     * The implementation that created this document.
     *
     * @type DOMImplementation
     * @readonly
     */
    implementation: null,
    nodeName: "#document",
    nodeType: DOCUMENT_NODE,
    /**
     * The DocumentType node of the document.
     *
     * @type DocumentType
     * @readonly
     */
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(newChild, refChild) {
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var child = newChild.firstChild;
        while (child) {
          var next = child.nextSibling;
          this.insertBefore(child, refChild);
          child = next;
        }
        return newChild;
      }
      _insertBefore(this, newChild, refChild);
      newChild.ownerDocument = this;
      if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
        this.documentElement = newChild;
      }
      return newChild;
    },
    removeChild: function(oldChild) {
      var removed = _removeChild(this, oldChild);
      if (removed === this.documentElement) {
        this.documentElement = null;
      }
      return removed;
    },
    replaceChild: function(newChild, oldChild) {
      _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
      newChild.ownerDocument = this;
      if (oldChild) {
        this.removeChild(oldChild);
      }
      if (isElementNode(newChild)) {
        this.documentElement = newChild;
      }
    },
    // Introduced in DOM Level 2:
    importNode: function(importedNode, deep) {
      return importNode(this, importedNode, deep);
    },
    // Introduced in DOM Level 2:
    getElementById: function(id) {
      var rtv = null;
      _visitNode(this.documentElement, function(node) {
        if (node.nodeType == ELEMENT_NODE) {
          if (node.getAttribute("id") == id) {
            rtv = node;
            return true;
          }
        }
      });
      return rtv;
    },
    /**
     * Creates a new `Element` that is owned by this `Document`.
     * In HTML Documents `localName` is the lower cased `tagName`,
     * otherwise no transformation is being applied.
     * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     * - There is no interface `HTMLElement`, it is always an `Element`.
     * - There is no support for a second argument to indicate using custom elements.
     *
     * @param {string} tagName
     * @returns {Element}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
     * @see https://dom.spec.whatwg.org/#dom-document-createelement
     * @see https://dom.spec.whatwg.org/#concept-create-element
     */
    createElement: function(tagName) {
      var node = new Element(PDC);
      node.ownerDocument = this;
      if (this.type === "html") {
        tagName = tagName.toLowerCase();
      }
      if (hasDefaultHTMLNamespace(this.contentType)) {
        node.namespaceURI = NAMESPACE.HTML;
      }
      node.nodeName = tagName;
      node.tagName = tagName;
      node.localName = tagName;
      node.childNodes = new NodeList();
      var attrs = node.attributes = new NamedNodeMap();
      attrs._ownerElement = node;
      return node;
    },
    /**
     * @returns {DocumentFragment}
     */
    createDocumentFragment: function() {
      var node = new DocumentFragment(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      return node;
    },
    /**
     * @param {string} data
     * @returns {Text}
     */
    createTextNode: function(data) {
      var node = new Text(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      node.appendData(data);
      return node;
    },
    /**
     * @param {string} data
     * @returns {Comment}
     */
    createComment: function(data) {
      var node = new Comment(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      node.appendData(data);
      return node;
    },
    /**
     * @param {string} data
     * @returns {CDATASection}
     */
    createCDATASection: function(data) {
      var node = new CDATASection(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      node.appendData(data);
      return node;
    },
    /**
     * @param {string} target
     * @param {string} data
     * @returns {ProcessingInstruction}
     */
    createProcessingInstruction: function(target, data) {
      var node = new ProcessingInstruction(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      node.nodeName = node.target = target;
      node.nodeValue = node.data = data;
      return node;
    },
    /**
     * Creates an `Attr` node that is owned by this document.
     * In HTML Documents `localName` is the lower cased `name`,
     * otherwise no transformation is being applied.
     *
     * __This implementation differs from the specification:__ - The provided name is not checked
     * against the `Name` production,
     * so no related error will be thrown.
     *
     * @param {string} name
     * @returns {Attr}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
     * @see https://dom.spec.whatwg.org/#dom-document-createattribute
     */
    createAttribute: function(name) {
      if (!g.QName_exact.test(name)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
      }
      if (this.type === "html") {
        name = name.toLowerCase();
      }
      return this._createAttribute(name);
    },
    _createAttribute: function(name) {
      var node = new Attr(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      node.name = name;
      node.nodeName = name;
      node.localName = name;
      node.specified = true;
      return node;
    },
    /**
     * Creates an EntityReference object.
     * The current implementation does not fill the `childNodes` with those of the corresponding
     * `Entity`
     *
     * @deprecated
     * In DOM Level 4.
     * @param {string} name
     * The name of the entity to reference. No namespace well-formedness checks are performed.
     * @returns {EntityReference}
     * @throws {DOMException}
     * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
     * @throws {DOMException}
     * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
     * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
     */
    createEntityReference: function(name) {
      if (!g.Name.test(name)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
      }
      if (this.type === "html") {
        throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
      }
      var node = new EntityReference(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      node.nodeName = name;
      return node;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Element}
     */
    createElementNS: function(namespaceURI, qualifiedName) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var node = new Element(PDC);
      var attrs = node.attributes = new NamedNodeMap();
      node.childNodes = new NodeList();
      node.ownerDocument = this;
      node.nodeName = qualifiedName;
      node.tagName = qualifiedName;
      node.namespaceURI = validated[0];
      node.prefix = validated[1];
      node.localName = validated[2];
      attrs._ownerElement = node;
      return node;
    },
    // Introduced in DOM Level 2:
    /**
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @returns {Attr}
     */
    createAttributeNS: function(namespaceURI, qualifiedName) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var node = new Attr(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      node.nodeName = qualifiedName;
      node.name = qualifiedName;
      node.specified = true;
      node.namespaceURI = validated[0];
      node.prefix = validated[1];
      node.localName = validated[2];
      return node;
    }
  };
  _extends(Document, Node);
  function Element(symbol) {
    checkSymbol(symbol);
    this._nsMap = /* @__PURE__ */ Object.create(null);
  }
  Element.prototype = {
    nodeType: ELEMENT_NODE,
    /**
     * The attributes of this element.
     *
     * @type {NamedNodeMap | null}
     */
    attributes: null,
    getQualifiedName: function() {
      return this.prefix ? this.prefix + ":" + this.localName : this.localName;
    },
    _isInHTMLDocumentAndNamespace: function() {
      return this.ownerDocument.type === "html" && this.namespaceURI === NAMESPACE.HTML;
    },
    /**
     * Implementaton of Level2 Core function hasAttributes.
     *
     * @returns {boolean}
     * True if attribute list is not empty.
     * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
     */
    hasAttributes: function() {
      return !!(this.attributes && this.attributes.length);
    },
    hasAttribute: function(name) {
      return !!this.getAttributeNode(name);
    },
    /**
     * Returns element’s first attribute whose qualified name is `name`, and `null`
     * if there is no such attribute.
     *
     * @param {string} name
     * @returns {string | null}
     */
    getAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      return attr ? attr.value : null;
    },
    getAttributeNode: function(name) {
      if (this._isInHTMLDocumentAndNamespace()) {
        name = name.toLowerCase();
      }
      return this.attributes.getNamedItem(name);
    },
    /**
     * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
     *
     * @param {string} name
     * @param {string} value
     */
    setAttribute: function(name, value) {
      if (this._isInHTMLDocumentAndNamespace()) {
        name = name.toLowerCase();
      }
      var attr = this.getAttributeNode(name);
      if (attr) {
        attr.value = attr.nodeValue = "" + value;
      } else {
        attr = this.ownerDocument._createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      }
    },
    removeAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      attr && this.removeAttributeNode(attr);
    },
    setAttributeNode: function(newAttr) {
      return this.attributes.setNamedItem(newAttr);
    },
    setAttributeNodeNS: function(newAttr) {
      return this.attributes.setNamedItemNS(newAttr);
    },
    removeAttributeNode: function(oldAttr) {
      return this.attributes.removeNamedItem(oldAttr.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function(namespaceURI, localName) {
      var old = this.getAttributeNodeNS(namespaceURI, localName);
      old && this.removeAttributeNode(old);
    },
    hasAttributeNS: function(namespaceURI, localName) {
      return this.getAttributeNodeNS(namespaceURI, localName) != null;
    },
    /**
     * Returns element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName`,
     * or `null` if there is no such attribute.
     *
     * @param {string} namespaceURI
     * @param {string} localName
     * @returns {string | null}
     */
    getAttributeNS: function(namespaceURI, localName) {
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      return attr ? attr.value : null;
    },
    /**
     * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
     * `localName` to value.
     *
     * @param {string} namespaceURI
     * @param {string} qualifiedName
     * @param {string} value
     * @see https://dom.spec.whatwg.org/#dom-element-setattributens
     */
    setAttributeNS: function(namespaceURI, qualifiedName, value) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var localName = validated[2];
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      if (attr) {
        attr.value = attr.nodeValue = "" + value;
      } else {
        attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      }
    },
    getAttributeNodeNS: function(namespaceURI, localName) {
      return this.attributes.getNamedItemNS(namespaceURI, localName);
    },
    /**
     * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
     *
     * Returns an empty list if `classNames` is an empty string or only contains HTML white space
     * characters.
     *
     * Warning: This returns a live LiveNodeList.
     * Changes in the DOM will reflect in the array as the changes occur.
     * If an element selected by this array no longer qualifies for the selector,
     * it will automatically be removed. Be aware of this for iteration purposes.
     *
     * @param {string} classNames
     * Is a string representing the class name(s) to match; multiple class names are separated by
     * (ASCII-)whitespace.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
     */
    getElementsByClassName: function(classNames) {
      var classNamesSet = toOrderedSet(classNames);
      return new LiveNodeList(this, function(base) {
        var ls = [];
        if (classNamesSet.length > 0) {
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE) {
              var nodeClassNames = node.getAttribute("class");
              if (nodeClassNames) {
                var matches = classNames === nodeClassNames;
                if (!matches) {
                  var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                  matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                }
                if (matches) {
                  ls.push(node);
                }
              }
            }
          });
        }
        return ls;
      });
    },
    /**
     * Returns a LiveNodeList of elements with the given qualifiedName.
     * Searching for all descendants can be done by passing `*` as `qualifiedName`.
     *
     * All descendants of the specified element are searched, but not the element itself.
     * The returned list is live, which means it updates itself with the DOM tree automatically.
     * Therefore, there is no need to call `Element.getElementsByTagName()`
     * with the same element and arguments repeatedly if the DOM changes in between calls.
     *
     * When called on an HTML element in an HTML document,
     * `getElementsByTagName` lower-cases the argument before searching for it.
     * This is undesirable when trying to match camel-cased SVG elements (such as
     * `<linearGradient>`) in an HTML document.
     * Instead, use `Element.getElementsByTagNameNS()`,
     * which preserves the capitalization of the tag name.
     *
     * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
     * except that it only searches for elements that are descendants of the specified element.
     *
     * @param {string} qualifiedName
     * @returns {LiveNodeList}
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
     * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
     */
    getElementsByTagName: function(qualifiedName) {
      var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html";
      var lowerQualifiedName = qualifiedName.toLowerCase();
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node === base || node.nodeType !== ELEMENT_NODE) {
            return;
          }
          if (qualifiedName === "*") {
            ls.push(node);
          } else {
            var nodeQualifiedName = node.getQualifiedName();
            var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
            if (nodeQualifiedName === matchingQName) {
              ls.push(node);
            }
          }
        });
        return ls;
      });
    },
    getElementsByTagNameNS: function(namespaceURI, localName) {
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
            ls.push(node);
          }
        });
        return ls;
      });
    }
  };
  Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
  Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
  Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
  _extends(Element, Node);
  function Attr(symbol) {
    checkSymbol(symbol);
    this.namespaceURI = null;
    this.prefix = null;
    this.ownerElement = null;
  }
  Attr.prototype.nodeType = ATTRIBUTE_NODE;
  _extends(Attr, Node);
  function CharacterData(symbol) {
    checkSymbol(symbol);
  }
  CharacterData.prototype = {
    data: "",
    substringData: function(offset, count) {
      return this.data.substring(offset, offset + count);
    },
    appendData: function(text) {
      text = this.data + text;
      this.nodeValue = this.data = text;
      this.length = text.length;
    },
    insertData: function(offset, text) {
      this.replaceData(offset, 0, text);
    },
    deleteData: function(offset, count) {
      this.replaceData(offset, count, "");
    },
    replaceData: function(offset, count, text) {
      var start = this.data.substring(0, offset);
      var end = this.data.substring(offset + count);
      text = start + text + end;
      this.nodeValue = this.data = text;
      this.length = text.length;
    }
  };
  _extends(CharacterData, Node);
  function Text(symbol) {
    checkSymbol(symbol);
  }
  Text.prototype = {
    nodeName: "#text",
    nodeType: TEXT_NODE,
    splitText: function(offset) {
      var text = this.data;
      var newText = text.substring(offset);
      text = text.substring(0, offset);
      this.data = this.nodeValue = text;
      this.length = text.length;
      var newNode = this.ownerDocument.createTextNode(newText);
      if (this.parentNode) {
        this.parentNode.insertBefore(newNode, this.nextSibling);
      }
      return newNode;
    }
  };
  _extends(Text, CharacterData);
  function Comment(symbol) {
    checkSymbol(symbol);
  }
  Comment.prototype = {
    nodeName: "#comment",
    nodeType: COMMENT_NODE
  };
  _extends(Comment, CharacterData);
  function CDATASection(symbol) {
    checkSymbol(symbol);
  }
  CDATASection.prototype = {
    nodeName: "#cdata-section",
    nodeType: CDATA_SECTION_NODE
  };
  _extends(CDATASection, Text);
  function DocumentType(symbol) {
    checkSymbol(symbol);
  }
  DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
  _extends(DocumentType, Node);
  function Notation(symbol) {
    checkSymbol(symbol);
  }
  Notation.prototype.nodeType = NOTATION_NODE;
  _extends(Notation, Node);
  function Entity(symbol) {
    checkSymbol(symbol);
  }
  Entity.prototype.nodeType = ENTITY_NODE;
  _extends(Entity, Node);
  function EntityReference(symbol) {
    checkSymbol(symbol);
  }
  EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
  _extends(EntityReference, Node);
  function DocumentFragment(symbol) {
    checkSymbol(symbol);
  }
  DocumentFragment.prototype.nodeName = "#document-fragment";
  DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
  _extends(DocumentFragment, Node);
  function ProcessingInstruction(symbol) {
    checkSymbol(symbol);
  }
  ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
  _extends(ProcessingInstruction, CharacterData);
  function XMLSerializer() {
  }
  XMLSerializer.prototype.serializeToString = function(node, nodeFilter) {
    return nodeSerializeToString.call(node, nodeFilter);
  };
  Node.prototype.toString = nodeSerializeToString;
  function nodeSerializeToString(nodeFilter) {
    var buf = [];
    var refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this;
    var prefix = refNode.prefix;
    var uri = refNode.namespaceURI;
    if (uri && prefix == null) {
      var prefix = refNode.lookupPrefix(uri);
      if (prefix == null) {
        var visibleNamespaces = [
          { namespace: uri, prefix: null }
          //{namespace:uri,prefix:''}
        ];
      }
    }
    serializeToString(this, buf, nodeFilter, visibleNamespaces);
    return buf.join("");
  }
  function needNamespaceDefine(node, isHTML, visibleNamespaces) {
    var prefix = node.prefix || "";
    var uri = node.namespaceURI;
    if (!uri) {
      return false;
    }
    if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
      return false;
    }
    var i = visibleNamespaces.length;
    while (i--) {
      var ns = visibleNamespaces[i];
      if (ns.prefix === prefix) {
        return ns.namespace !== uri;
      }
    }
    return true;
  }
  function addSerializedAttribute(buf, qualifiedName, value) {
    buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
  }
  function serializeToString(node, buf, nodeFilter, visibleNamespaces) {
    if (!visibleNamespaces) {
      visibleNamespaces = [];
    }
    var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
    var isHTML = doc.type === "html";
    if (nodeFilter) {
      node = nodeFilter(node);
      if (node) {
        if (typeof node == "string") {
          buf.push(node);
          return;
        }
      } else {
        return;
      }
    }
    switch (node.nodeType) {
      case ELEMENT_NODE:
        var attrs = node.attributes;
        var len = attrs.length;
        var child = node.firstChild;
        var nodeName = node.tagName;
        var prefixedNodeName = nodeName;
        if (!isHTML && !node.prefix && node.namespaceURI) {
          var defaultNS;
          for (var ai = 0; ai < attrs.length; ai++) {
            if (attrs.item(ai).name === "xmlns") {
              defaultNS = attrs.item(ai).value;
              break;
            }
          }
          if (!defaultNS) {
            for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
              var namespace = visibleNamespaces[nsi];
              if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                defaultNS = namespace.namespace;
                break;
              }
            }
          }
          if (defaultNS !== node.namespaceURI) {
            for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
              var namespace = visibleNamespaces[nsi];
              if (namespace.namespace === node.namespaceURI) {
                if (namespace.prefix) {
                  prefixedNodeName = namespace.prefix + ":" + nodeName;
                }
                break;
              }
            }
          }
        }
        buf.push("<", prefixedNodeName);
        for (var i = 0; i < len; i++) {
          var attr = attrs.item(i);
          if (attr.prefix == "xmlns") {
            visibleNamespaces.push({
              prefix: attr.localName,
              namespace: attr.value
            });
          } else if (attr.nodeName == "xmlns") {
            visibleNamespaces.push({ prefix: "", namespace: attr.value });
          }
        }
        for (var i = 0; i < len; i++) {
          var attr = attrs.item(i);
          if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
            var prefix = attr.prefix || "";
            var uri = attr.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          serializeToString(attr, buf, nodeFilter, visibleNamespaces);
        }
        if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
          var prefix = node.prefix || "";
          var uri = node.namespaceURI;
          addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
          visibleNamespaces.push({ prefix, namespace: uri });
        }
        var canCloseTag = !child;
        if (canCloseTag && (isHTML || node.namespaceURI === NAMESPACE.HTML)) {
          canCloseTag = isHTMLVoidElement(nodeName);
        }
        if (canCloseTag) {
          buf.push("/>");
        } else {
          buf.push(">");
          if (isHTML && isHTMLRawTextElement(nodeName)) {
            while (child) {
              if (child.data) {
                buf.push(child.data);
              } else {
                serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
              }
              child = child.nextSibling;
            }
          } else {
            while (child) {
              serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
              child = child.nextSibling;
            }
          }
          buf.push("</", prefixedNodeName, ">");
        }
        return;
      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        var child = node.firstChild;
        while (child) {
          serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
          child = child.nextSibling;
        }
        return;
      case ATTRIBUTE_NODE:
        return addSerializedAttribute(buf, node.name, node.value);
      case TEXT_NODE:
        return buf.push(node.data.replace(/[<&>]/g, _xmlEncoder));
      case CDATA_SECTION_NODE:
        return buf.push(g.CDATA_START, node.data, g.CDATA_END);
      case COMMENT_NODE:
        return buf.push(g.COMMENT_START, node.data, g.COMMENT_END);
      case DOCUMENT_TYPE_NODE:
        var pubid = node.publicId;
        var sysid = node.systemId;
        buf.push(g.DOCTYPE_DECL_START, " ", node.name);
        if (pubid) {
          buf.push(" ", g.PUBLIC, " ", pubid);
          if (sysid && sysid !== ".") {
            buf.push(" ", sysid);
          }
        } else if (sysid && sysid !== ".") {
          buf.push(" ", g.SYSTEM, " ", sysid);
        }
        if (node.internalSubset) {
          buf.push(" [", node.internalSubset, "]");
        }
        buf.push(">");
        return;
      case PROCESSING_INSTRUCTION_NODE:
        return buf.push("<?", node.target, " ", node.data, "?>");
      case ENTITY_REFERENCE_NODE:
        return buf.push("&", node.nodeName, ";");
      //case ENTITY_NODE:
      //case NOTATION_NODE:
      default:
        buf.push("??", node.nodeName);
    }
  }
  function importNode(doc, node, deep) {
    var node2;
    switch (node.nodeType) {
      case ELEMENT_NODE:
        node2 = node.cloneNode(false);
        node2.ownerDocument = doc;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}
      case DOCUMENT_FRAGMENT_NODE:
        break;
      case ATTRIBUTE_NODE:
        deep = true;
        break;
    }
    if (!node2) {
      node2 = node.cloneNode(false);
    }
    node2.ownerDocument = doc;
    node2.parentNode = null;
    if (deep) {
      var child = node.firstChild;
      while (child) {
        node2.appendChild(importNode(doc, child, deep));
        child = child.nextSibling;
      }
    }
    return node2;
  }
  function cloneNode(doc, node, deep) {
    var node2 = new node.constructor(PDC);
    for (var n in node) {
      if (hasOwn(node, n)) {
        var v = node[n];
        if (typeof v != "object") {
          if (v != node2[n]) {
            node2[n] = v;
          }
        }
      }
    }
    if (node.childNodes) {
      node2.childNodes = new NodeList();
    }
    node2.ownerDocument = doc;
    switch (node2.nodeType) {
      case ELEMENT_NODE:
        var attrs = node.attributes;
        var attrs2 = node2.attributes = new NamedNodeMap();
        var len = attrs.length;
        attrs2._ownerElement = node2;
        for (var i = 0; i < len; i++) {
          node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
        }
        break;
      case ATTRIBUTE_NODE:
        deep = true;
    }
    if (deep) {
      var child = node.firstChild;
      while (child) {
        node2.appendChild(cloneNode(doc, child, deep));
        child = child.nextSibling;
      }
    }
    return node2;
  }
  function __set__(object, key, value) {
    object[key] = value;
  }
  try {
    if (Object.defineProperty) {
      let getTextContent2 = function(node) {
        switch (node.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            var buf = [];
            node = node.firstChild;
            while (node) {
              if (node.nodeType !== 7 && node.nodeType !== 8) {
                buf.push(getTextContent2(node));
              }
              node = node.nextSibling;
            }
            return buf.join("");
          default:
            return node.nodeValue;
        }
      };
      var getTextContent = getTextContent2;
      Object.defineProperty(LiveNodeList.prototype, "length", {
        get: function() {
          _updateLiveList(this);
          return this.$$length;
        }
      });
      Object.defineProperty(Node.prototype, "textContent", {
        get: function() {
          return getTextContent2(this);
        },
        set: function(data) {
          switch (this.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              while (this.firstChild) {
                this.removeChild(this.firstChild);
              }
              if (data || String(data)) {
                this.appendChild(this.ownerDocument.createTextNode(data));
              }
              break;
            default:
              this.data = data;
              this.value = data;
              this.nodeValue = data;
          }
        }
      });
      __set__ = function(object, key, value) {
        object["$$" + key] = value;
      };
    }
  } catch (e) {
  }
  dom._updateLiveList = _updateLiveList;
  dom.Attr = Attr;
  dom.CDATASection = CDATASection;
  dom.CharacterData = CharacterData;
  dom.Comment = Comment;
  dom.Document = Document;
  dom.DocumentFragment = DocumentFragment;
  dom.DocumentType = DocumentType;
  dom.DOMImplementation = DOMImplementation;
  dom.Element = Element;
  dom.Entity = Entity;
  dom.EntityReference = EntityReference;
  dom.LiveNodeList = LiveNodeList;
  dom.NamedNodeMap = NamedNodeMap;
  dom.Node = Node;
  dom.NodeList = NodeList;
  dom.Notation = Notation;
  dom.Text = Text;
  dom.ProcessingInstruction = ProcessingInstruction;
  dom.XMLSerializer = XMLSerializer;
  return dom;
}
var domParser = {};
var entities = {};
var hasRequiredEntities;
function requireEntities() {
  if (hasRequiredEntities) return entities;
  hasRequiredEntities = 1;
  (function(exports) {
    var freeze = requireConventions().freeze;
    exports.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports.HTML_ENTITIES = freeze({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: "\n",
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  })(entities);
  return entities;
}
var sax = {};
var hasRequiredSax;
function requireSax() {
  if (hasRequiredSax) return sax;
  hasRequiredSax = 1;
  var conventions2 = requireConventions();
  var g = requireGrammar();
  var errors2 = requireErrors();
  var isHTMLEscapableRawTextElement = conventions2.isHTMLEscapableRawTextElement;
  var isHTMLMimeType = conventions2.isHTMLMimeType;
  var isHTMLRawTextElement = conventions2.isHTMLRawTextElement;
  var hasOwn = conventions2.hasOwn;
  var NAMESPACE = conventions2.NAMESPACE;
  var ParseError = errors2.ParseError;
  var DOMException = errors2.DOMException;
  var S_TAG = 0;
  var S_ATTR = 1;
  var S_ATTR_SPACE = 2;
  var S_EQ = 3;
  var S_ATTR_NOQUOT_VALUE = 4;
  var S_ATTR_END = 5;
  var S_TAG_SPACE = 6;
  var S_TAG_CLOSE = 7;
  function XMLReader() {
  }
  XMLReader.prototype = {
    parse: function(source, defaultNSMap, entityMap) {
      var domBuilder = this.domBuilder;
      domBuilder.startDocument();
      _copy(defaultNSMap, defaultNSMap = /* @__PURE__ */ Object.create(null));
      parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
      domBuilder.endDocument();
    }
  };
  var ENTITY_REG = /&#?\w+;?/g;
  function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
    var isHTML = isHTMLMimeType(domBuilder.mimeType);
    if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
      errorHandler.warning("Unicode replacement character detected, source encoding issues?");
    }
    function fixedFromCharCode(code) {
      if (code > 65535) {
        code -= 65536;
        var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      } else {
        return String.fromCharCode(code);
      }
    }
    function entityReplacer(a2) {
      var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
      if (!isHTML && complete !== a2) {
        errorHandler.error("EntityRef: expecting ;");
        return a2;
      }
      var match = g.Reference.exec(complete);
      if (!match || match[0].length !== complete.length) {
        errorHandler.error("entity not matching Reference production: " + a2);
        return a2;
      }
      var k = complete.slice(1, -1);
      if (hasOwn(entityMap, k)) {
        return entityMap[k];
      } else if (k.charAt(0) === "#") {
        return fixedFromCharCode(parseInt(k.substring(1).replace("x", "0x")));
      } else {
        errorHandler.error("entity not found:" + a2);
        return a2;
      }
    }
    function appendText(end2) {
      if (end2 > start) {
        var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
        locator && position(start);
        domBuilder.characters(xt, 0, end2 - start);
        start = end2;
      }
    }
    var lineStart = 0;
    var lineEnd = 0;
    var linePattern = /\r\n?|\n|$/g;
    var locator = domBuilder.locator;
    function position(p, m) {
      while (p >= lineEnd && (m = linePattern.exec(source))) {
        lineStart = lineEnd;
        lineEnd = m.index + m[0].length;
        locator.lineNumber++;
      }
      locator.columnNumber = p - lineStart + 1;
    }
    var parseStack = [{ currentNSMap: defaultNSMapCopy }];
    var unclosedTags = [];
    var start = 0;
    while (true) {
      try {
        var tagStart = source.indexOf("<", start);
        if (tagStart < 0) {
          if (!isHTML && unclosedTags.length > 0) {
            return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
          }
          if (!source.substring(start).match(/^\s*$/)) {
            var doc = domBuilder.doc;
            var text = doc.createTextNode(source.substring(start));
            if (doc.documentElement) {
              return errorHandler.error("Extra content at the end of the document");
            }
            doc.appendChild(text);
            domBuilder.currentElement = text;
          }
          return;
        }
        if (tagStart > start) {
          var fromSource = source.substring(start, tagStart);
          if (!isHTML && unclosedTags.length === 0) {
            fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), "");
            fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
          }
          appendText(tagStart);
        }
        switch (source.charAt(tagStart + 1)) {
          case "/":
            var end = source.indexOf(">", tagStart + 2);
            var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : void 0);
            if (!tagNameRaw) {
              return errorHandler.fatalError("end tag name missing");
            }
            var tagNameMatch = end > 0 && g.reg("^", g.QName_group, g.S_OPT, "$").exec(tagNameRaw);
            if (!tagNameMatch) {
              return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
            }
            if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
              return;
            }
            var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
            if (currentTagName !== tagNameMatch[1]) {
              var tagNameLower = tagNameMatch[1].toLowerCase();
              if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
                return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
              }
            }
            var config = parseStack.pop();
            unclosedTags.pop();
            var localNSMap = config.localNSMap;
            domBuilder.endElement(config.uri, config.localName, currentTagName);
            if (localNSMap) {
              for (var prefix in localNSMap) {
                if (hasOwn(localNSMap, prefix)) {
                  domBuilder.endPrefixMapping(prefix);
                }
              }
            }
            end++;
            break;
          // end element
          case "?":
            locator && position(tagStart);
            end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
            break;
          case "!":
            locator && position(tagStart);
            end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
            break;
          default:
            locator && position(tagStart);
            var el = new ElementAttributes();
            var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
            var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
            var len = el.length;
            if (!el.closed) {
              if (isHTML && conventions2.isHTMLVoidElement(el.tagName)) {
                el.closed = true;
              } else {
                unclosedTags.push(el.tagName);
              }
            }
            if (locator && len) {
              var locator2 = copyLocator(locator, {});
              for (var i = 0; i < len; i++) {
                var a = el[i];
                position(a.offset);
                a.locator = copyLocator(locator, {});
              }
              domBuilder.locator = locator2;
              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
              domBuilder.locator = locator;
            } else {
              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
            }
            if (isHTML && !el.closed) {
              end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
            } else {
              end++;
            }
        }
      } catch (e) {
        if (e instanceof ParseError) {
          throw e;
        } else if (e instanceof DOMException) {
          throw new ParseError(e.name + ": " + e.message, domBuilder.locator, e);
        }
        errorHandler.error("element parse error: " + e);
        end = -1;
      }
      if (end > start) {
        start = end;
      } else {
        appendText(Math.max(tagStart, start) + 1);
      }
    }
  }
  function copyLocator(f, t) {
    t.lineNumber = f.lineNumber;
    t.columnNumber = f.columnNumber;
    return t;
  }
  function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
    function addAttribute(qname, value2, startIndex) {
      if (hasOwn(el.attributeNames, qname)) {
        return errorHandler.fatalError("Attribute " + qname + " redefined");
      }
      if (!isHTML && value2.indexOf("<") >= 0) {
        return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
      }
      el.addValue(
        qname,
        // @see https://www.w3.org/TR/xml/#AVNormalize
        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
        // - recursive replacement of (DTD) entity references
        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
        value2.replace(/[\t\n\r]/g, " ").replace(ENTITY_REG, entityReplacer),
        startIndex
      );
    }
    var attrName;
    var value;
    var p = ++start;
    var s = S_TAG;
    while (true) {
      var c = source.charAt(p);
      switch (c) {
        case "=":
          if (s === S_ATTR) {
            attrName = source.slice(start, p);
            s = S_EQ;
          } else if (s === S_ATTR_SPACE) {
            s = S_EQ;
          } else {
            throw new Error("attribute equal must after attrName");
          }
          break;
        case "'":
        case '"':
          if (s === S_EQ || s === S_ATTR) {
            if (s === S_ATTR) {
              errorHandler.warning('attribute value must after "="');
              attrName = source.slice(start, p);
            }
            start = p + 1;
            p = source.indexOf(c, start);
            if (p > 0) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start - 1);
              s = S_ATTR_END;
            } else {
              throw new Error("attribute value no end '" + c + "' match");
            }
          } else if (s == S_ATTR_NOQUOT_VALUE) {
            value = source.slice(start, p);
            addAttribute(attrName, value, start);
            errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
            start = p + 1;
            s = S_ATTR_END;
          } else {
            throw new Error('attribute value must after "="');
          }
          break;
        case "/":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              s = S_TAG_CLOSE;
              el.closed = true;
            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
              break;
            case S_ATTR_SPACE:
              el.closed = true;
              break;
            //case S_EQ:
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          errorHandler.error("unexpected end of input");
          if (s == S_TAG) {
            el.setTagName(source.slice(start, p));
          }
          return p;
        case ">":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              break;
            //normal
            case S_ATTR_NOQUOT_VALUE:
            //Compatible state
            case S_ATTR:
              value = source.slice(start, p);
              if (value.slice(-1) === "/") {
                el.closed = true;
                value = value.slice(0, -1);
              }
            case S_ATTR_SPACE:
              if (s === S_ATTR_SPACE) {
                value = attrName;
              }
              if (s == S_ATTR_NOQUOT_VALUE) {
                errorHandler.warning('attribute "' + value + '" missed quot(")!');
                addAttribute(attrName, value, start);
              } else {
                if (!isHTML) {
                  errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                }
                addAttribute(value, value, start);
              }
              break;
            case S_EQ:
              if (!isHTML) {
                return errorHandler.fatalError(`AttValue: ' or " expected`);
              }
          }
          return p;
        /*xml space '\x20' | #x9 | #xD | #xA; */
        case "":
          c = " ";
        default:
          if (c <= " ") {
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
                s = S_TAG_SPACE;
                break;
              case S_ATTR:
                attrName = source.slice(start, p);
                s = S_ATTR_SPACE;
                break;
              case S_ATTR_NOQUOT_VALUE:
                var value = source.slice(start, p);
                errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                addAttribute(attrName, value, start);
              case S_ATTR_END:
                s = S_TAG_SPACE;
                break;
            }
          } else {
            switch (s) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case S_ATTR_SPACE:
                if (!isHTML) {
                  errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                }
                addAttribute(attrName, attrName, start);
                start = p;
                s = S_ATTR;
                break;
              case S_ATTR_END:
                errorHandler.warning('attribute space is required"' + attrName + '"!!');
              case S_TAG_SPACE:
                s = S_ATTR;
                start = p;
                break;
              case S_EQ:
                s = S_ATTR_NOQUOT_VALUE;
                start = p;
                break;
              case S_TAG_CLOSE:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
          }
      }
      p++;
    }
  }
  function appendElement(el, domBuilder, currentNSMap) {
    var tagName = el.tagName;
    var localNSMap = null;
    var i = el.length;
    while (i--) {
      var a = el[i];
      var qName = a.qName;
      var value = a.value;
      var nsp = qName.indexOf(":");
      if (nsp > 0) {
        var prefix = a.prefix = qName.slice(0, nsp);
        var localName = qName.slice(nsp + 1);
        var nsPrefix = prefix === "xmlns" && localName;
      } else {
        localName = qName;
        prefix = null;
        nsPrefix = qName === "xmlns" && "";
      }
      a.localName = localName;
      if (nsPrefix !== false) {
        if (localNSMap == null) {
          localNSMap = /* @__PURE__ */ Object.create(null);
          _copy(currentNSMap, currentNSMap = /* @__PURE__ */ Object.create(null));
        }
        currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
        a.uri = NAMESPACE.XMLNS;
        domBuilder.startPrefixMapping(nsPrefix, value);
      }
    }
    var i = el.length;
    while (i--) {
      a = el[i];
      if (a.prefix) {
        if (a.prefix === "xml") {
          a.uri = NAMESPACE.XML;
        }
        if (a.prefix !== "xmlns") {
          a.uri = currentNSMap[a.prefix];
        }
      }
    }
    var nsp = tagName.indexOf(":");
    if (nsp > 0) {
      prefix = el.prefix = tagName.slice(0, nsp);
      localName = el.localName = tagName.slice(nsp + 1);
    } else {
      prefix = null;
      localName = el.localName = tagName;
    }
    var ns = el.uri = currentNSMap[prefix || ""];
    domBuilder.startElement(ns, localName, tagName, el);
    if (el.closed) {
      domBuilder.endElement(ns, localName, tagName);
      if (localNSMap) {
        for (prefix in localNSMap) {
          if (hasOwn(localNSMap, prefix)) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      }
    } else {
      el.currentNSMap = currentNSMap;
      el.localNSMap = localNSMap;
      return true;
    }
  }
  function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
    var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
    if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
      var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
      var text = source.substring(elStartEnd + 1, elEndStart);
      if (isEscapableRaw) {
        text = text.replace(ENTITY_REG, entityReplacer);
      }
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
    }
    return elStartEnd + 1;
  }
  function _copy(source, target) {
    for (var n in source) {
      if (hasOwn(source, n)) {
        target[n] = source[n];
      }
    }
  }
  function parseUtils(source, start) {
    var index = start;
    function char(n) {
      n = n || 0;
      return source.charAt(index + n);
    }
    function skip(n) {
      n = n || 1;
      index += n;
    }
    function skipBlanks() {
      var blanks = 0;
      while (index < source.length) {
        var c = char();
        if (c !== " " && c !== "\n" && c !== "	" && c !== "\r") {
          return blanks;
        }
        blanks++;
        skip();
      }
      return -1;
    }
    function substringFromIndex() {
      return source.substring(index);
    }
    function substringStartsWith(text) {
      return source.substring(index, index + text.length) === text;
    }
    function substringStartsWithCaseInsensitive(text) {
      return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
    }
    function getMatch(args) {
      var expr = g.reg("^", args);
      var match = expr.exec(substringFromIndex());
      if (match) {
        skip(match[0].length);
        return match[0];
      }
      return null;
    }
    return {
      char,
      getIndex: function() {
        return index;
      },
      getMatch,
      getSource: function() {
        return source;
      },
      skip,
      skipBlanks,
      substringFromIndex,
      substringStartsWith,
      substringStartsWithCaseInsensitive
    };
  }
  function parseDoctypeInternalSubset(p, errorHandler) {
    function parsePI(p2, errorHandler2) {
      var match = g.PI.exec(p2.substringFromIndex());
      if (!match) {
        return errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
      }
      if (match[1].toLowerCase() === "xml") {
        return errorHandler2.fatalError(
          "xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex()
        );
      }
      p2.skip(match[0].length);
      return match[0];
    }
    var source = p.getSource();
    if (p.char() === "[") {
      p.skip(1);
      var intSubsetStart = p.getIndex();
      while (p.getIndex() < source.length) {
        p.skipBlanks();
        if (p.char() === "]") {
          var internalSubset = source.substring(intSubsetStart, p.getIndex());
          p.skip(1);
          return internalSubset;
        }
        var current = null;
        if (p.char() === "<" && p.char(1) === "!") {
          switch (p.char(2)) {
            case "E":
              if (p.char(3) === "L") {
                current = p.getMatch(g.elementdecl);
              } else if (p.char(3) === "N") {
                current = p.getMatch(g.EntityDecl);
              }
              break;
            case "A":
              current = p.getMatch(g.AttlistDecl);
              break;
            case "N":
              current = p.getMatch(g.NotationDecl);
              break;
            case "-":
              current = p.getMatch(g.Comment);
              break;
          }
        } else if (p.char() === "<" && p.char(1) === "?") {
          current = parsePI(p, errorHandler);
        } else if (p.char() === "%") {
          current = p.getMatch(g.PEReference);
        } else {
          return errorHandler.fatalError("Error detected in Markup declaration");
        }
        if (!current) {
          return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
        }
      }
      return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
    var p = parseUtils(source, start);
    switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
      case "-":
        var comment = p.getMatch(g.Comment);
        if (comment) {
          domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
          return p.getIndex();
        } else {
          return errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
        }
      case "[":
        var cdata = p.getMatch(g.CDSect);
        if (cdata) {
          if (!isHTML && !domBuilder.currentElement) {
            return errorHandler.fatalError("CDATA outside of element");
          }
          domBuilder.startCDATA();
          domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
          domBuilder.endCDATA();
          return p.getIndex();
        } else {
          return errorHandler.fatalError("Invalid CDATA starting at position " + start);
        }
      case "D": {
        if (domBuilder.doc && domBuilder.doc.documentElement) {
          return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
        }
        if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
          return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
        }
        p.skip(g.DOCTYPE_DECL_START.length);
        if (p.skipBlanks() < 1) {
          return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
        }
        var doctype = {
          name: void 0,
          publicId: void 0,
          systemId: void 0,
          internalSubset: void 0
        };
        doctype.name = p.getMatch(g.Name);
        if (!doctype.name)
          return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
        if (isHTML && doctype.name.toLowerCase() !== "html") {
          errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex());
        }
        p.skipBlanks();
        if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
          var match = g.ExternalID_match.exec(p.substringFromIndex());
          if (!match) {
            return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
          }
          if (match.groups.SystemLiteralOnly !== void 0) {
            doctype.systemId = match.groups.SystemLiteralOnly;
          } else {
            doctype.systemId = match.groups.SystemLiteral;
            doctype.publicId = match.groups.PubidLiteral;
          }
          p.skip(match[0].length);
        } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
          p.skip(g.SYSTEM.length);
          if (p.skipBlanks() < 1) {
            return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
          }
          doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
          if (!doctype.systemId) {
            return errorHandler.fatalError(
              "Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex()
            );
          }
        }
        if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
          errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex());
        }
        if (!isHTML) {
          p.skipBlanks();
          doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
        }
        p.skipBlanks();
        if (p.char() !== ">") {
          return errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex());
        }
        p.skip(1);
        domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
        domBuilder.endDTD();
        return p.getIndex();
      }
      default:
        return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
    }
  }
  function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
    var match = source.substring(start).match(g.PI);
    if (!match) {
      return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
    }
    if (match[1].toLowerCase() === "xml") {
      if (start > 0) {
        return errorHandler.fatalError(
          "processing instruction at position " + start + " is an xml declaration which is only at the start of the document"
        );
      }
      if (!g.XMLDecl.test(source.substring(start))) {
        return errorHandler.fatalError("xml declaration is not well-formed");
      }
    }
    domBuilder.processingInstruction(match[1], match[2]);
    return start + match[0].length;
  }
  function ElementAttributes() {
    this.attributeNames = /* @__PURE__ */ Object.create(null);
  }
  ElementAttributes.prototype = {
    setTagName: function(tagName) {
      if (!g.QName_exact.test(tagName)) {
        throw new Error("invalid tagName:" + tagName);
      }
      this.tagName = tagName;
    },
    addValue: function(qName, value, offset) {
      if (!g.QName_exact.test(qName)) {
        throw new Error("invalid attribute:" + qName);
      }
      this.attributeNames[qName] = this.length;
      this[this.length++] = { qName, value, offset };
    },
    length: 0,
    getLocalName: function(i) {
      return this[i].localName;
    },
    getLocator: function(i) {
      return this[i].locator;
    },
    getQName: function(i) {
      return this[i].qName;
    },
    getURI: function(i) {
      return this[i].uri;
    },
    getValue: function(i) {
      return this[i].value;
    }
    //	,getIndex:function(uri, localName)){
    //		if(localName){
    //
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},
  };
  sax.XMLReader = XMLReader;
  sax.parseUtils = parseUtils;
  sax.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;
  return sax;
}
var hasRequiredDomParser;
function requireDomParser() {
  if (hasRequiredDomParser) return domParser;
  hasRequiredDomParser = 1;
  var conventions2 = requireConventions();
  var dom2 = requireDom();
  var errors2 = requireErrors();
  var entities2 = requireEntities();
  var sax2 = requireSax();
  var DOMImplementation = dom2.DOMImplementation;
  var hasDefaultHTMLNamespace = conventions2.hasDefaultHTMLNamespace;
  var isHTMLMimeType = conventions2.isHTMLMimeType;
  var isValidMimeType = conventions2.isValidMimeType;
  var MIME_TYPE = conventions2.MIME_TYPE;
  var NAMESPACE = conventions2.NAMESPACE;
  var ParseError = errors2.ParseError;
  var XMLReader = sax2.XMLReader;
  function normalizeLineEndings(input) {
    return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028\u2029]/g, "\n");
  }
  function DOMParser(options) {
    options = options || {};
    if (options.locator === void 0) {
      options.locator = true;
    }
    this.assign = options.assign || conventions2.assign;
    this.domHandler = options.domHandler || DOMHandler;
    this.onError = options.onError || options.errorHandler;
    if (options.errorHandler && typeof options.errorHandler !== "function") {
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    } else if (options.errorHandler) {
      options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this);
    }
    this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings;
    this.locator = !!options.locator;
    this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), options.xmlns);
  }
  DOMParser.prototype.parseFromString = function(source, mimeType) {
    if (!isValidMimeType(mimeType)) {
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
    }
    var defaultNSMap = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns);
    var entityMap = entities2.XML_ENTITIES;
    var defaultNamespace = defaultNSMap[""] || null;
    if (hasDefaultHTMLNamespace(mimeType)) {
      entityMap = entities2.HTML_ENTITIES;
      defaultNamespace = NAMESPACE.HTML;
    } else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
      defaultNamespace = NAMESPACE.SVG;
    }
    defaultNSMap[""] = defaultNamespace;
    defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
    var domBuilder = new this.domHandler({
      mimeType,
      defaultNamespace,
      onError: this.onError
    });
    var locator = this.locator ? {} : void 0;
    if (this.locator) {
      domBuilder.setDocumentLocator(locator);
    }
    var sax3 = new XMLReader();
    sax3.errorHandler = domBuilder;
    sax3.domBuilder = domBuilder;
    var isXml = !conventions2.isHTMLMimeType(mimeType);
    if (isXml && typeof source !== "string") {
      sax3.errorHandler.fatalError("source is not a string");
    }
    sax3.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
    if (!domBuilder.doc.documentElement) {
      sax3.errorHandler.fatalError("missing root element");
    }
    return domBuilder.doc;
  };
  function DOMHandler(options) {
    var opt = options || {};
    this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;
    this.defaultNamespace = opt.defaultNamespace || null;
    this.cdata = false;
    this.currentElement = void 0;
    this.doc = void 0;
    this.locator = void 0;
    this.onError = opt.onError;
  }
  function position(locator, node) {
    node.lineNumber = locator.lineNumber;
    node.columnNumber = locator.columnNumber;
  }
  DOMHandler.prototype = {
    /**
     * Either creates an XML or an HTML document and stores it under `this.doc`.
     * If it is an XML document, `this.defaultNamespace` is used to create it,
     * and it will not contain any `childNodes`.
     * If it is an HTML document, it will be created without any `childNodes`.
     *
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */
    startDocument: function() {
      var impl = new DOMImplementation();
      this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, "");
    },
    startElement: function(namespaceURI, localName, qName, attrs) {
      var doc = this.doc;
      var el = doc.createElementNS(namespaceURI, qName || localName);
      var len = attrs.length;
      appendElement(this, el);
      this.currentElement = el;
      this.locator && position(this.locator, el);
      for (var i = 0; i < len; i++) {
        var namespaceURI = attrs.getURI(i);
        var value = attrs.getValue(i);
        var qName = attrs.getQName(i);
        var attr = doc.createAttributeNS(namespaceURI, qName);
        this.locator && position(attrs.getLocator(i), attr);
        attr.value = attr.nodeValue = value;
        el.setAttributeNode(attr);
      }
    },
    endElement: function(namespaceURI, localName, qName) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(prefix, uri) {
    },
    endPrefixMapping: function(prefix) {
    },
    processingInstruction: function(target, data) {
      var ins = this.doc.createProcessingInstruction(target, data);
      this.locator && position(this.locator, ins);
      appendElement(this, ins);
    },
    ignorableWhitespace: function(ch3, start, length) {
    },
    characters: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      if (chars) {
        if (this.cdata) {
          var charNode = this.doc.createCDATASection(chars);
        } else {
          var charNode = this.doc.createTextNode(chars);
        }
        if (this.currentElement) {
          this.currentElement.appendChild(charNode);
        } else if (/^\s*$/.test(chars)) {
          this.doc.appendChild(charNode);
        }
        this.locator && position(this.locator, charNode);
      }
    },
    skippedEntity: function(name) {
    },
    endDocument: function() {
      this.doc.normalize();
    },
    /**
     * Stores the locator to be able to set the `columnNumber` and `lineNumber`
     * on the created DOM nodes.
     *
     * @param {Locator} locator
     */
    setDocumentLocator: function(locator) {
      if (locator) {
        locator.lineNumber = 0;
      }
      this.locator = locator;
    },
    //LexicalHandler
    comment: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      var comm = this.doc.createComment(chars);
      this.locator && position(this.locator, comm);
      appendElement(this, comm);
    },
    startCDATA: function() {
      this.cdata = true;
    },
    endCDATA: function() {
      this.cdata = false;
    },
    startDTD: function(name, publicId, systemId, internalSubset) {
      var impl = this.doc.implementation;
      if (impl && impl.createDocumentType) {
        var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
        this.locator && position(this.locator, dt);
        appendElement(this, dt);
        this.doc.doctype = dt;
      }
    },
    reportError: function(level, message) {
      if (typeof this.onError === "function") {
        try {
          this.onError(level, message, this);
        } catch (e) {
          throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
        }
      } else {
        console.error("[xmldom " + level + "]	" + message, _locator(this.locator));
      }
    },
    /**
     * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
     */
    warning: function(message) {
      this.reportError("warning", message);
    },
    error: function(message) {
      this.reportError("error", message);
    },
    /**
     * This function reports a fatal error and throws a ParseError.
     *
     * @param {string} message
     * - The message to be used for reporting and throwing the error.
     * @returns {never}
     * This function always throws an error and never returns a value.
     * @throws {ParseError}
     * Always throws a ParseError with the provided message.
     */
    fatalError: function(message) {
      this.reportError("fatalError", message);
      throw new ParseError(message, this.locator);
    }
  };
  function _locator(l) {
    if (l) {
      return "\n@#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
    }
  }
  function _toString(chars, start, length) {
    if (typeof chars == "string") {
      return chars.substr(start, length);
    } else {
      if (chars.length >= start + length || start) {
        return new java.lang.String(chars, start, length) + "";
      }
      return chars;
    }
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
    /\w+/g,
    function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    }
  );
  function appendElement(handler, node) {
    if (!handler.currentElement) {
      handler.doc.appendChild(node);
    } else {
      handler.currentElement.appendChild(node);
    }
  }
  function onErrorStopParsing(level) {
    if (level === "error") throw "onErrorStopParsing";
  }
  function onWarningStopParsing() {
    throw "onWarningStopParsing";
  }
  domParser.__DOMHandler = DOMHandler;
  domParser.DOMParser = DOMParser;
  domParser.normalizeLineEndings = normalizeLineEndings;
  domParser.onErrorStopParsing = onErrorStopParsing;
  domParser.onWarningStopParsing = onWarningStopParsing;
  return domParser;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  var conventions2 = requireConventions();
  lib.assign = conventions2.assign;
  lib.hasDefaultHTMLNamespace = conventions2.hasDefaultHTMLNamespace;
  lib.isHTMLMimeType = conventions2.isHTMLMimeType;
  lib.isValidMimeType = conventions2.isValidMimeType;
  lib.MIME_TYPE = conventions2.MIME_TYPE;
  lib.NAMESPACE = conventions2.NAMESPACE;
  var errors2 = requireErrors();
  lib.DOMException = errors2.DOMException;
  lib.DOMExceptionName = errors2.DOMExceptionName;
  lib.ExceptionCode = errors2.ExceptionCode;
  lib.ParseError = errors2.ParseError;
  var dom2 = requireDom();
  lib.Attr = dom2.Attr;
  lib.CDATASection = dom2.CDATASection;
  lib.CharacterData = dom2.CharacterData;
  lib.Comment = dom2.Comment;
  lib.Document = dom2.Document;
  lib.DocumentFragment = dom2.DocumentFragment;
  lib.DocumentType = dom2.DocumentType;
  lib.DOMImplementation = dom2.DOMImplementation;
  lib.Element = dom2.Element;
  lib.Entity = dom2.Entity;
  lib.EntityReference = dom2.EntityReference;
  lib.LiveNodeList = dom2.LiveNodeList;
  lib.NamedNodeMap = dom2.NamedNodeMap;
  lib.Node = dom2.Node;
  lib.NodeList = dom2.NodeList;
  lib.Notation = dom2.Notation;
  lib.ProcessingInstruction = dom2.ProcessingInstruction;
  lib.Text = dom2.Text;
  lib.XMLSerializer = dom2.XMLSerializer;
  var domParser2 = requireDomParser();
  lib.DOMParser = domParser2.DOMParser;
  lib.normalizeLineEndings = domParser2.normalizeLineEndings;
  lib.onErrorStopParsing = domParser2.onErrorStopParsing;
  lib.onWarningStopParsing = domParser2.onWarningStopParsing;
  return lib;
}
var libExports = requireLib();
const xml2json = async (xml) => {
  const dom2 = new libExports.DOMParser().parseFromString(xml, "text/xml");
  return dom2json(dom2);
};
const json2xml = async (json) => {
  const dom2 = await json2dom(json);
  return new libExports.XMLSerializer().serializeToString(dom2);
};
const instruction2json = ({ nodeName, nodeValue }) => {
  return {
    name: nodeName,
    type: "instruction",
    value: nodeValue
  };
};
const json2instruction = (dom2, item) => {
  const node = dom2.ownerDocument.createProcessingInstruction(
    item.name,
    item.value
  );
  dom2.appendChild(node);
};
const text2json = ({ nodeValue }) => {
  return {
    name: "#",
    type: "text",
    value: nodeValue
  };
};
const json2text = (dom2, item) => {
  const node = dom2.ownerDocument.createTextNode(item.value);
  dom2.appendChild(node);
};
const attributes2json = (attributes) => {
  const attrs = {};
  for (const { name, value } of attributes) {
    attrs[name] = value;
  }
  return attrs;
};
const json2atttributes = (dom2, attrs) => {
  for (const [name, value] of Object.entries(attrs)) {
    dom2.setAttribute(name, value);
  }
};
const element2json = ({ nodeName, attributes, childNodes }) => {
  return {
    name: nodeName,
    type: "element",
    attrs: attributes2json(attributes),
    children: nodes2json(childNodes)
  };
};
const json2element = (dom2, item) => {
  const node = dom2.ownerDocument.createElement(item.name);
  json2atttributes(node, item.attrs);
  json2nodes(node, item.children);
  dom2.appendChild(node);
};
const nodes2json = (nodes) => {
  const children = [];
  for (const node of nodes) {
    if (node.nodeType === 1) {
      const child = element2json(node);
      children.push(child);
    } else if (node.nodeType === 3) {
      const child = text2json(node);
      children.push(child);
    } else if (node.nodeType === 7) {
      const child = instruction2json(node);
      children.push(child);
    }
  }
  return children;
};
const json2nodes = (dom2, items) => {
  for (const item of items) {
    if (item.type === "text") {
      json2text(dom2, item);
    } else if (item.type === "instruction") {
      json2instruction(dom2, item);
    } else {
      json2element(dom2, item);
    }
  }
};
const dom2json = async (dom2) => {
  return nodes2json(dom2.childNodes);
};
const json2dom = async (json) => {
  const dom2 = new libExports.DOMImplementation().createDocument();
  json2nodes(dom2, json);
  return dom2;
};
var ch2 = {};
var wk = function(c, id, msg, transfer, cb) {
  var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
    c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
  ], { type: "text/javascript" }))));
  w.onmessage = function(e) {
    var d = e.data, ed = d.$e$;
    if (ed) {
      var err2 = new Error(ed[0]);
      err2["code"] = ed[1];
      err2.stack = ed[2];
      cb(err2, null);
    } else
      cb(null, d);
  };
  w.postMessage(msg, transfer);
  return w;
};
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b.b, revfd = _b.r;
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
  var x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
  flt[i] = 8;
for (var i = 144; i < 256; ++i)
  flt[i] = 9;
for (var i = 256; i < 280; ++i)
  flt[i] = 7;
for (var i = 280; i < 288; ++i)
  flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
  fdt[i] = 5;
var flm = /* @__PURE__ */ hMap(flt, 9, 0), flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0), fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    ++lcfreq[lclt[i] & 31];
  for (var i = 0; i < lcdt.length; ++i)
    ++lcfreq[lcdt[i] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    var sym = syms[i];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i + 2 < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    for (i = Math.max(i, wi); i < s; ++i) {
      syms[li++] = dat[i];
      ++lf[dat[i]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i, st.w = wi;
    }
  } else {
    for (var i = st.w || 0; i < s + lst; i += 65535) {
      var e = i + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ function() {
  var t = new Int32Array(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i] = c;
  }
  return t;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wcln = function(fn, fnStr, td2) {
  var dt = fn();
  var st = fn.toString();
  var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
  for (var i = 0; i < dt.length; ++i) {
    var v = dt[i], k = ks[i];
    if (typeof v == "function") {
      fnStr += ";" + k + "=";
      var st_1 = v.toString();
      if (v.prototype) {
        if (st_1.indexOf("[native code]") != -1) {
          var spInd = st_1.indexOf(" ", 8) + 1;
          fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
        } else {
          fnStr += st_1;
          for (var t in v.prototype)
            fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
        }
      } else
        fnStr += st_1;
    } else
      td2[k] = v;
  }
  return fnStr;
};
var ch = [];
var cbfs = function(v) {
  var tl = [];
  for (var k in v) {
    if (v[k].buffer) {
      tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    }
  }
  return tl;
};
var wrkr = function(fns, init, id, cb) {
  if (!ch[id]) {
    var fnStr = "", td_1 = {}, m = fns.length - 1;
    for (var i = 0; i < m; ++i)
      fnStr = wcln(fns[i], fnStr, td_1);
    ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
  }
  var td2 = mrg({}, ch[id].e);
  return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
};
var bInflt = function() {
  return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];
};
var bDflt = function() {
  return [u8, u16, i32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
};
var gopt = function(o) {
  return o && {
    out: o.size && new u8(o.size),
    dictionary: o.dictionary
  };
};
var cbify = function(dat, opts, fns, init, id, cb) {
  var w = wrkr(fns, init, id, function(err2, dat2) {
    w.terminate();
    cb(err2, dat2);
  });
  w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
  return function() {
    w.terminate();
  };
};
var b2 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
  return b4(d, b) + b4(d, b + 4) * 4294967296;
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
function deflate(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bDflt
  ], function(ev) {
    return pbf(deflateSync(ev.data[0], ev.data[1]));
  }, 0, cb);
}
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
function inflate(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bInflt
  ], function(ev) {
    return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));
  }, 1, cb);
}
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var fltn = function(d, p, t, o) {
  for (var k in d) {
    var val = d[k], n = p + k, op = o;
    if (Array.isArray(val))
      op = mrg(o, val[1]), val = val[0];
    if (val instanceof u8)
      t[n] = [val, op];
    else {
      t[n += "/"] = [new u8(0), op];
      fltn(val, n, t, o);
    }
  }
};
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var dutf8 = function(d) {
  for (var r = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return { s: r, r: slc(d, i - 1) };
    if (!eb)
      r += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
function strToU8(str, latin1) {
  var i;
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
    if (r.length)
      err(8);
    return s;
  }
}
var slzh = function(d, b) {
  return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
var zh = function(d, b, z) {
  var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
  var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
  return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
var z64e = function(d, b) {
  for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
    ;
  return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
  if (y < 0 || y > 119)
    err(10);
  wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
  if (c != -1) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e);
};
function zip$1(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  var r = {};
  fltn(data, "", r, opts);
  var k = Object.keys(r);
  var lft = k.length, o = 0, tot = 0;
  var slft = lft, files = new Array(lft);
  var term = [];
  var tAll = function() {
    for (var i2 = 0; i2 < term.length; ++i2)
      term[i2]();
  };
  var cbd = function(a, b) {
    mt(function() {
      cb(a, b);
    });
  };
  mt(function() {
    cbd = cb;
  });
  var cbf = function() {
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    tot = 0;
    for (var i2 = 0; i2 < slft; ++i2) {
      var f = files[i2];
      try {
        var l = f.c.length;
        wzh(out, tot, f, f.f, f.u, l);
        var badd = 30 + f.f.length + exfl(f.extra);
        var loc = tot + badd;
        out.set(f.c, loc);
        wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
      } catch (e) {
        return cbd(e, null);
      }
    }
    wzf(out, o, files.length, cdl, oe);
    cbd(null, out);
  };
  if (!lft)
    cbf();
  var _loop_1 = function(i2) {
    var fn = k[i2];
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var c = crc(), size = file.length;
    c.p(file);
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    var compression = p.level == 0 ? 0 : 8;
    var cbl = function(e, d) {
      if (e) {
        tAll();
        cbd(e, null);
      } else {
        var l = d.length;
        files[i2] = mrg(p, {
          size,
          crc: c.d(),
          c: d,
          f,
          m,
          u: s != fn.length || m && com.length != ms,
          compression
        });
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
        if (!--lft)
          cbf();
      }
    };
    if (s > 65535)
      cbl(err(11, 0, 1), null);
    if (!compression)
      cbl(null, file);
    else if (size < 16e4) {
      try {
        cbl(null, deflateSync(file, p));
      } catch (e) {
        cbl(e, null);
      }
    } else
      term.push(deflate(file, p, cbl));
  };
  for (var i = 0; i < slft; ++i) {
    _loop_1(i);
  }
  return tAll;
}
var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
  fn();
};
function unzip$1(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  var term = [];
  var tAll = function() {
    for (var i2 = 0; i2 < term.length; ++i2)
      term[i2]();
  };
  var files = {};
  var cbd = function(a, b) {
    mt(function() {
      cb(a, b);
    });
  };
  mt(function() {
    cbd = cb;
  });
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558) {
      cbd(err(13, 0, 1), null);
      return tAll;
    }
  }
  var lft = b2(data, e + 8);
  if (lft) {
    var c = lft;
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = lft = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    var _loop_3 = function(i2) {
      var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      var cbl = function(e2, d) {
        if (e2) {
          tAll();
          cbd(e2, null);
        } else {
          if (d)
            files[fn] = d;
          if (!--lft)
            cbd(null, files);
        }
      };
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_1
      })) {
        if (!c_1)
          cbl(null, slc(data, b, b + sc));
        else if (c_1 == 8) {
          var infl = data.subarray(b, b + sc);
          if (su < 524288 || sc > 0.8 * su) {
            try {
              cbl(null, inflateSync(infl, { out: new u8(su) }));
            } catch (e2) {
              cbl(e2, null);
            }
          } else
            term.push(inflate(infl, { size: su }, cbl));
        } else
          cbl(err(14, "unknown compression type " + c_1, 1), null);
      } else
        cbl(null, null);
    };
    for (var i = 0; i < c; ++i) {
      _loop_3(i);
    }
  } else
    cbd(null, {});
  return tAll;
}
const promisify = (fn, ...args) => new Promise(
  (resolve, reject) => fn(...args, (err2, result) => err2 ? reject(err2) : resolve(result))
);
const unzip = async (u82) => {
  return promisify(unzip$1, u82);
};
const zip = async (files) => {
  return promisify(zip$1, files);
};
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const u82base64 = function(input) {
  var output = [];
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0, len = input.length, remainingBytes = len;
  var isArray = typeof input !== "string";
  while (i < input.length) {
    remainingBytes = len - i;
    if (!isArray) {
      chr1 = input.charCodeAt(i++);
      chr2 = i < len ? input.charCodeAt(i++) : 0;
      chr3 = i < len ? input.charCodeAt(i++) : 0;
    } else {
      chr1 = input[i++];
      chr2 = i < len ? input[i++] : 0;
      chr3 = i < len ? input[i++] : 0;
    }
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
    enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
    output.push(
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
    );
  }
  return output.join("");
};
const base642u8 = function(input) {
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0, resultIndex = 0;
  var dataUrlPrefix = "data:";
  if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
    throw new Error("Invalid base64 input, it looks like a data url.");
  }
  input = input.replace(/[^A-Za-z0-9+/=]/g, "");
  var totalLength = input.length * 3 / 4;
  if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
    totalLength--;
  }
  if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
    totalLength--;
  }
  if (totalLength % 1 !== 0) {
    throw new Error("Invalid base64 input, bad content length.");
  }
  var output;
  output = new Uint8Array(totalLength | 0);
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output[resultIndex++] = chr1;
    if (enc3 !== 64) {
      output[resultIndex++] = chr2;
    }
    if (enc4 !== 64) {
      output[resultIndex++] = chr3;
    }
  }
  return output;
};
const u82str = (u82) => {
  return new TextDecoder().decode(u82);
};
const str2u8 = (str) => {
  return new TextEncoder().encode(str);
};
const types$1 = {
  "application/prs.cww": ["cww"],
  "application/prs.xsf+xml": ["xsf"],
  "application/vnd.1000minds.decision-model+xml": ["1km"],
  "application/vnd.3gpp.pic-bw-large": ["plb"],
  "application/vnd.3gpp.pic-bw-small": ["psb"],
  "application/vnd.3gpp.pic-bw-var": ["pvb"],
  "application/vnd.3gpp2.tcap": ["tcap"],
  "application/vnd.3m.post-it-notes": ["pwn"],
  "application/vnd.accpac.simply.aso": ["aso"],
  "application/vnd.accpac.simply.imp": ["imp"],
  "application/vnd.acucobol": ["acu"],
  "application/vnd.acucorp": ["atc", "acutc"],
  "application/vnd.adobe.air-application-installer-package+zip": ["air"],
  "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
  "application/vnd.adobe.fxp": ["fxp", "fxpl"],
  "application/vnd.adobe.xdp+xml": ["xdp"],
  "application/vnd.adobe.xfdf": ["*xfdf"],
  "application/vnd.age": ["age"],
  "application/vnd.ahead.space": ["ahead"],
  "application/vnd.airzip.filesecure.azf": ["azf"],
  "application/vnd.airzip.filesecure.azs": ["azs"],
  "application/vnd.amazon.ebook": ["azw"],
  "application/vnd.americandynamics.acc": ["acc"],
  "application/vnd.amiga.ami": ["ami"],
  "application/vnd.android.package-archive": ["apk"],
  "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
  "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
  "application/vnd.antix.game-component": ["atx"],
  "application/vnd.apple.installer+xml": ["mpkg"],
  "application/vnd.apple.keynote": ["key"],
  "application/vnd.apple.mpegurl": ["m3u8"],
  "application/vnd.apple.numbers": ["numbers"],
  "application/vnd.apple.pages": ["pages"],
  "application/vnd.apple.pkpass": ["pkpass"],
  "application/vnd.aristanetworks.swi": ["swi"],
  "application/vnd.astraea-software.iota": ["iota"],
  "application/vnd.audiograph": ["aep"],
  "application/vnd.balsamiq.bmml+xml": ["bmml"],
  "application/vnd.blueice.multipass": ["mpm"],
  "application/vnd.bmi": ["bmi"],
  "application/vnd.businessobjects": ["rep"],
  "application/vnd.chemdraw+xml": ["cdxml"],
  "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
  "application/vnd.cinderella": ["cdy"],
  "application/vnd.citationstyles.style+xml": ["csl"],
  "application/vnd.claymore": ["cla"],
  "application/vnd.cloanto.rp9": ["rp9"],
  "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
  "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
  "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
  "application/vnd.commonspace": ["csp"],
  "application/vnd.contact.cmsg": ["cdbcmsg"],
  "application/vnd.cosmocaller": ["cmc"],
  "application/vnd.crick.clicker": ["clkx"],
  "application/vnd.crick.clicker.keyboard": ["clkk"],
  "application/vnd.crick.clicker.palette": ["clkp"],
  "application/vnd.crick.clicker.template": ["clkt"],
  "application/vnd.crick.clicker.wordbank": ["clkw"],
  "application/vnd.criticaltools.wbs+xml": ["wbs"],
  "application/vnd.ctc-posml": ["pml"],
  "application/vnd.cups-ppd": ["ppd"],
  "application/vnd.curl.car": ["car"],
  "application/vnd.curl.pcurl": ["pcurl"],
  "application/vnd.dart": ["dart"],
  "application/vnd.data-vision.rdz": ["rdz"],
  "application/vnd.dbf": ["dbf"],
  "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
  "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
  "application/vnd.dece.unspecified": ["uvx", "uvvx"],
  "application/vnd.dece.zip": ["uvz", "uvvz"],
  "application/vnd.denovo.fcselayout-link": ["fe_launch"],
  "application/vnd.dna": ["dna"],
  "application/vnd.dolby.mlp": ["mlp"],
  "application/vnd.dpgraph": ["dpg"],
  "application/vnd.dreamfactory": ["dfac"],
  "application/vnd.ds-keypoint": ["kpxx"],
  "application/vnd.dvb.ait": ["ait"],
  "application/vnd.dvb.service": ["svc"],
  "application/vnd.dynageo": ["geo"],
  "application/vnd.ecowin.chart": ["mag"],
  "application/vnd.enliven": ["nml"],
  "application/vnd.epson.esf": ["esf"],
  "application/vnd.epson.msf": ["msf"],
  "application/vnd.epson.quickanime": ["qam"],
  "application/vnd.epson.salt": ["slt"],
  "application/vnd.epson.ssf": ["ssf"],
  "application/vnd.eszigno3+xml": ["es3", "et3"],
  "application/vnd.ezpix-album": ["ez2"],
  "application/vnd.ezpix-package": ["ez3"],
  "application/vnd.fdf": ["*fdf"],
  "application/vnd.fdsn.mseed": ["mseed"],
  "application/vnd.fdsn.seed": ["seed", "dataless"],
  "application/vnd.flographit": ["gph"],
  "application/vnd.fluxtime.clip": ["ftc"],
  "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
  "application/vnd.frogans.fnc": ["fnc"],
  "application/vnd.frogans.ltf": ["ltf"],
  "application/vnd.fsc.weblaunch": ["fsc"],
  "application/vnd.fujitsu.oasys": ["oas"],
  "application/vnd.fujitsu.oasys2": ["oa2"],
  "application/vnd.fujitsu.oasys3": ["oa3"],
  "application/vnd.fujitsu.oasysgp": ["fg5"],
  "application/vnd.fujitsu.oasysprs": ["bh2"],
  "application/vnd.fujixerox.ddd": ["ddd"],
  "application/vnd.fujixerox.docuworks": ["xdw"],
  "application/vnd.fujixerox.docuworks.binder": ["xbd"],
  "application/vnd.fuzzysheet": ["fzs"],
  "application/vnd.genomatix.tuxedo": ["txd"],
  "application/vnd.geogebra.file": ["ggb"],
  "application/vnd.geogebra.slides": ["ggs"],
  "application/vnd.geogebra.tool": ["ggt"],
  "application/vnd.geometry-explorer": ["gex", "gre"],
  "application/vnd.geonext": ["gxt"],
  "application/vnd.geoplan": ["g2w"],
  "application/vnd.geospace": ["g3w"],
  "application/vnd.gmx": ["gmx"],
  "application/vnd.google-apps.document": ["gdoc"],
  "application/vnd.google-apps.presentation": ["gslides"],
  "application/vnd.google-apps.spreadsheet": ["gsheet"],
  "application/vnd.google-earth.kml+xml": ["kml"],
  "application/vnd.google-earth.kmz": ["kmz"],
  "application/vnd.gov.sk.xmldatacontainer+xml": ["xdcf"],
  "application/vnd.grafeq": ["gqf", "gqs"],
  "application/vnd.groove-account": ["gac"],
  "application/vnd.groove-help": ["ghf"],
  "application/vnd.groove-identity-message": ["gim"],
  "application/vnd.groove-injector": ["grv"],
  "application/vnd.groove-tool-message": ["gtm"],
  "application/vnd.groove-tool-template": ["tpl"],
  "application/vnd.groove-vcard": ["vcg"],
  "application/vnd.hal+xml": ["hal"],
  "application/vnd.handheld-entertainment+xml": ["zmm"],
  "application/vnd.hbci": ["hbci"],
  "application/vnd.hhe.lesson-player": ["les"],
  "application/vnd.hp-hpgl": ["hpgl"],
  "application/vnd.hp-hpid": ["hpid"],
  "application/vnd.hp-hps": ["hps"],
  "application/vnd.hp-jlyt": ["jlt"],
  "application/vnd.hp-pcl": ["pcl"],
  "application/vnd.hp-pclxl": ["pclxl"],
  "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
  "application/vnd.ibm.minipay": ["mpy"],
  "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
  "application/vnd.ibm.rights-management": ["irm"],
  "application/vnd.ibm.secure-container": ["sc"],
  "application/vnd.iccprofile": ["icc", "icm"],
  "application/vnd.igloader": ["igl"],
  "application/vnd.immervision-ivp": ["ivp"],
  "application/vnd.immervision-ivu": ["ivu"],
  "application/vnd.insors.igm": ["igm"],
  "application/vnd.intercon.formnet": ["xpw", "xpx"],
  "application/vnd.intergeo": ["i2g"],
  "application/vnd.intu.qbo": ["qbo"],
  "application/vnd.intu.qfx": ["qfx"],
  "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
  "application/vnd.irepository.package+xml": ["irp"],
  "application/vnd.is-xpr": ["xpr"],
  "application/vnd.isac.fcs": ["fcs"],
  "application/vnd.jam": ["jam"],
  "application/vnd.jcp.javame.midlet-rms": ["rms"],
  "application/vnd.jisp": ["jisp"],
  "application/vnd.joost.joda-archive": ["joda"],
  "application/vnd.kahootz": ["ktz", "ktr"],
  "application/vnd.kde.karbon": ["karbon"],
  "application/vnd.kde.kchart": ["chrt"],
  "application/vnd.kde.kformula": ["kfo"],
  "application/vnd.kde.kivio": ["flw"],
  "application/vnd.kde.kontour": ["kon"],
  "application/vnd.kde.kpresenter": ["kpr", "kpt"],
  "application/vnd.kde.kspread": ["ksp"],
  "application/vnd.kde.kword": ["kwd", "kwt"],
  "application/vnd.kenameaapp": ["htke"],
  "application/vnd.kidspiration": ["kia"],
  "application/vnd.kinar": ["kne", "knp"],
  "application/vnd.koan": ["skp", "skd", "skt", "skm"],
  "application/vnd.kodak-descriptor": ["sse"],
  "application/vnd.las.las+xml": ["lasxml"],
  "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
  "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
  "application/vnd.lotus-1-2-3": ["123"],
  "application/vnd.lotus-approach": ["apr"],
  "application/vnd.lotus-freelance": ["pre"],
  "application/vnd.lotus-notes": ["nsf"],
  "application/vnd.lotus-organizer": ["org"],
  "application/vnd.lotus-screencam": ["scm"],
  "application/vnd.lotus-wordpro": ["lwp"],
  "application/vnd.macports.portpkg": ["portpkg"],
  "application/vnd.mapbox-vector-tile": ["mvt"],
  "application/vnd.mcd": ["mcd"],
  "application/vnd.medcalcdata": ["mc1"],
  "application/vnd.mediastation.cdkey": ["cdkey"],
  "application/vnd.mfer": ["mwf"],
  "application/vnd.mfmp": ["mfm"],
  "application/vnd.micrografx.flo": ["flo"],
  "application/vnd.micrografx.igx": ["igx"],
  "application/vnd.mif": ["mif"],
  "application/vnd.mobius.daf": ["daf"],
  "application/vnd.mobius.dis": ["dis"],
  "application/vnd.mobius.mbk": ["mbk"],
  "application/vnd.mobius.mqy": ["mqy"],
  "application/vnd.mobius.msl": ["msl"],
  "application/vnd.mobius.plc": ["plc"],
  "application/vnd.mobius.txf": ["txf"],
  "application/vnd.mophun.application": ["mpn"],
  "application/vnd.mophun.certificate": ["mpc"],
  "application/vnd.mozilla.xul+xml": ["xul"],
  "application/vnd.ms-artgalry": ["cil"],
  "application/vnd.ms-cab-compressed": ["cab"],
  "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
  "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
  "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
  "application/vnd.ms-fontobject": ["eot"],
  "application/vnd.ms-htmlhelp": ["chm"],
  "application/vnd.ms-ims": ["ims"],
  "application/vnd.ms-lrm": ["lrm"],
  "application/vnd.ms-officetheme": ["thmx"],
  "application/vnd.ms-outlook": ["msg"],
  "application/vnd.ms-pki.seccat": ["cat"],
  "application/vnd.ms-pki.stl": ["*stl"],
  "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
  "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
  "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
  "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
  "application/vnd.ms-project": ["*mpp", "mpt"],
  "application/vnd.ms-word.document.macroenabled.12": ["docm"],
  "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
  "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
  "application/vnd.ms-wpl": ["wpl"],
  "application/vnd.ms-xpsdocument": ["xps"],
  "application/vnd.mseq": ["mseq"],
  "application/vnd.musician": ["mus"],
  "application/vnd.muvee.style": ["msty"],
  "application/vnd.mynfc": ["taglet"],
  "application/vnd.nato.bindingdataobject+xml": ["bdo"],
  "application/vnd.neurolanguage.nlu": ["nlu"],
  "application/vnd.nitf": ["ntf", "nitf"],
  "application/vnd.noblenet-directory": ["nnd"],
  "application/vnd.noblenet-sealer": ["nns"],
  "application/vnd.noblenet-web": ["nnw"],
  "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
  "application/vnd.nokia.n-gage.data": ["ngdat"],
  "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
  "application/vnd.nokia.radio-preset": ["rpst"],
  "application/vnd.nokia.radio-presets": ["rpss"],
  "application/vnd.novadigm.edm": ["edm"],
  "application/vnd.novadigm.edx": ["edx"],
  "application/vnd.novadigm.ext": ["ext"],
  "application/vnd.oasis.opendocument.chart": ["odc"],
  "application/vnd.oasis.opendocument.chart-template": ["otc"],
  "application/vnd.oasis.opendocument.database": ["odb"],
  "application/vnd.oasis.opendocument.formula": ["odf"],
  "application/vnd.oasis.opendocument.formula-template": ["odft"],
  "application/vnd.oasis.opendocument.graphics": ["odg"],
  "application/vnd.oasis.opendocument.graphics-template": ["otg"],
  "application/vnd.oasis.opendocument.image": ["odi"],
  "application/vnd.oasis.opendocument.image-template": ["oti"],
  "application/vnd.oasis.opendocument.presentation": ["odp"],
  "application/vnd.oasis.opendocument.presentation-template": ["otp"],
  "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
  "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
  "application/vnd.oasis.opendocument.text": ["odt"],
  "application/vnd.oasis.opendocument.text-master": ["odm"],
  "application/vnd.oasis.opendocument.text-template": ["ott"],
  "application/vnd.oasis.opendocument.text-web": ["oth"],
  "application/vnd.olpc-sugar": ["xo"],
  "application/vnd.oma.dd2+xml": ["dd2"],
  "application/vnd.openblox.game+xml": ["obgx"],
  "application/vnd.openofficeorg.extension": ["oxt"],
  "application/vnd.openstreetmap.data+xml": ["osm"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    "pptx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slide": [
    "sldx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
    "ppsx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.template": [
    "potx"
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
    "xltx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    "docx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
    "dotx"
  ],
  "application/vnd.osgeo.mapguide.package": ["mgp"],
  "application/vnd.osgi.dp": ["dp"],
  "application/vnd.osgi.subsystem": ["esa"],
  "application/vnd.palm": ["pdb", "pqa", "oprc"],
  "application/vnd.pawaafile": ["paw"],
  "application/vnd.pg.format": ["str"],
  "application/vnd.pg.osasli": ["ei6"],
  "application/vnd.picsel": ["efif"],
  "application/vnd.pmi.widget": ["wg"],
  "application/vnd.pocketlearn": ["plf"],
  "application/vnd.powerbuilder6": ["pbd"],
  "application/vnd.previewsystems.box": ["box"],
  "application/vnd.proteus.magazine": ["mgz"],
  "application/vnd.publishare-delta-tree": ["qps"],
  "application/vnd.pvi.ptid1": ["ptid"],
  "application/vnd.pwg-xhtml-print+xml": ["xhtm"],
  "application/vnd.quark.quarkxpress": [
    "qxd",
    "qxt",
    "qwd",
    "qwt",
    "qxl",
    "qxb"
  ],
  "application/vnd.rar": ["rar"],
  "application/vnd.realvnc.bed": ["bed"],
  "application/vnd.recordare.musicxml": ["mxl"],
  "application/vnd.recordare.musicxml+xml": ["musicxml"],
  "application/vnd.rig.cryptonote": ["cryptonote"],
  "application/vnd.rim.cod": ["cod"],
  "application/vnd.rn-realmedia": ["rm"],
  "application/vnd.rn-realmedia-vbr": ["rmvb"],
  "application/vnd.route66.link66+xml": ["link66"],
  "application/vnd.sailingtracker.track": ["st"],
  "application/vnd.seemail": ["see"],
  "application/vnd.sema": ["sema"],
  "application/vnd.semd": ["semd"],
  "application/vnd.semf": ["semf"],
  "application/vnd.shana.informed.formdata": ["ifm"],
  "application/vnd.shana.informed.formtemplate": ["itp"],
  "application/vnd.shana.informed.interchange": ["iif"],
  "application/vnd.shana.informed.package": ["ipk"],
  "application/vnd.simtech-mindmapper": ["twd", "twds"],
  "application/vnd.smaf": ["mmf"],
  "application/vnd.smart.teacher": ["teacher"],
  "application/vnd.software602.filler.form+xml": ["fo"],
  "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
  "application/vnd.spotfire.dxp": ["dxp"],
  "application/vnd.spotfire.sfs": ["sfs"],
  "application/vnd.stardivision.calc": ["sdc"],
  "application/vnd.stardivision.draw": ["sda"],
  "application/vnd.stardivision.impress": ["sdd"],
  "application/vnd.stardivision.math": ["smf"],
  "application/vnd.stardivision.writer": ["sdw", "vor"],
  "application/vnd.stardivision.writer-global": ["sgl"],
  "application/vnd.stepmania.package": ["smzip"],
  "application/vnd.stepmania.stepchart": ["sm"],
  "application/vnd.sun.wadl+xml": ["wadl"],
  "application/vnd.sun.xml.calc": ["sxc"],
  "application/vnd.sun.xml.calc.template": ["stc"],
  "application/vnd.sun.xml.draw": ["sxd"],
  "application/vnd.sun.xml.draw.template": ["std"],
  "application/vnd.sun.xml.impress": ["sxi"],
  "application/vnd.sun.xml.impress.template": ["sti"],
  "application/vnd.sun.xml.math": ["sxm"],
  "application/vnd.sun.xml.writer": ["sxw"],
  "application/vnd.sun.xml.writer.global": ["sxg"],
  "application/vnd.sun.xml.writer.template": ["stw"],
  "application/vnd.sus-calendar": ["sus", "susp"],
  "application/vnd.svd": ["svd"],
  "application/vnd.symbian.install": ["sis", "sisx"],
  "application/vnd.syncml+xml": ["xsm"],
  "application/vnd.syncml.dm+wbxml": ["bdm"],
  "application/vnd.syncml.dm+xml": ["xdm"],
  "application/vnd.syncml.dmddf+xml": ["ddf"],
  "application/vnd.tao.intent-module-archive": ["tao"],
  "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
  "application/vnd.tmobile-livetv": ["tmo"],
  "application/vnd.trid.tpt": ["tpt"],
  "application/vnd.triscape.mxs": ["mxs"],
  "application/vnd.trueapp": ["tra"],
  "application/vnd.ufdl": ["ufd", "ufdl"],
  "application/vnd.uiq.theme": ["utz"],
  "application/vnd.umajin": ["umj"],
  "application/vnd.unity": ["unityweb"],
  "application/vnd.uoml+xml": ["uoml", "uo"],
  "application/vnd.vcx": ["vcx"],
  "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
  "application/vnd.visionary": ["vis"],
  "application/vnd.vsf": ["vsf"],
  "application/vnd.wap.wbxml": ["wbxml"],
  "application/vnd.wap.wmlc": ["wmlc"],
  "application/vnd.wap.wmlscriptc": ["wmlsc"],
  "application/vnd.webturbo": ["wtb"],
  "application/vnd.wolfram.player": ["nbp"],
  "application/vnd.wordperfect": ["wpd"],
  "application/vnd.wqd": ["wqd"],
  "application/vnd.wt.stf": ["stf"],
  "application/vnd.xara": ["xar"],
  "application/vnd.xfdl": ["xfdl"],
  "application/vnd.yamaha.hv-dic": ["hvd"],
  "application/vnd.yamaha.hv-script": ["hvs"],
  "application/vnd.yamaha.hv-voice": ["hvp"],
  "application/vnd.yamaha.openscoreformat": ["osf"],
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
  "application/vnd.yamaha.smaf-audio": ["saf"],
  "application/vnd.yamaha.smaf-phrase": ["spf"],
  "application/vnd.yellowriver-custom-menu": ["cmp"],
  "application/vnd.zul": ["zir", "zirz"],
  "application/vnd.zzazz.deck+xml": ["zaz"],
  "application/x-7z-compressed": ["7z"],
  "application/x-abiword": ["abw"],
  "application/x-ace-compressed": ["ace"],
  "application/x-apple-diskimage": ["*dmg"],
  "application/x-arj": ["arj"],
  "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
  "application/x-authorware-map": ["aam"],
  "application/x-authorware-seg": ["aas"],
  "application/x-bcpio": ["bcpio"],
  "application/x-bdoc": ["*bdoc"],
  "application/x-bittorrent": ["torrent"],
  "application/x-blorb": ["blb", "blorb"],
  "application/x-bzip": ["bz"],
  "application/x-bzip2": ["bz2", "boz"],
  "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
  "application/x-cdlink": ["vcd"],
  "application/x-cfs-compressed": ["cfs"],
  "application/x-chat": ["chat"],
  "application/x-chess-pgn": ["pgn"],
  "application/x-chrome-extension": ["crx"],
  "application/x-cocoa": ["cco"],
  "application/x-conference": ["nsc"],
  "application/x-cpio": ["cpio"],
  "application/x-csh": ["csh"],
  "application/x-debian-package": ["*deb", "udeb"],
  "application/x-dgc-compressed": ["dgc"],
  "application/x-director": [
    "dir",
    "dcr",
    "dxr",
    "cst",
    "cct",
    "cxt",
    "w3d",
    "fgd",
    "swa"
  ],
  "application/x-doom": ["wad"],
  "application/x-dtbncx+xml": ["ncx"],
  "application/x-dtbook+xml": ["dtb"],
  "application/x-dtbresource+xml": ["res"],
  "application/x-dvi": ["dvi"],
  "application/x-envoy": ["evy"],
  "application/x-eva": ["eva"],
  "application/x-font-bdf": ["bdf"],
  "application/x-font-ghostscript": ["gsf"],
  "application/x-font-linux-psf": ["psf"],
  "application/x-font-pcf": ["pcf"],
  "application/x-font-snf": ["snf"],
  "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
  "application/x-freearc": ["arc"],
  "application/x-futuresplash": ["spl"],
  "application/x-gca-compressed": ["gca"],
  "application/x-glulx": ["ulx"],
  "application/x-gnumeric": ["gnumeric"],
  "application/x-gramps-xml": ["gramps"],
  "application/x-gtar": ["gtar"],
  "application/x-hdf": ["hdf"],
  "application/x-httpd-php": ["php"],
  "application/x-install-instructions": ["install"],
  "application/x-iso9660-image": ["*iso"],
  "application/x-iwork-keynote-sffkey": ["*key"],
  "application/x-iwork-numbers-sffnumbers": ["*numbers"],
  "application/x-iwork-pages-sffpages": ["*pages"],
  "application/x-java-archive-diff": ["jardiff"],
  "application/x-java-jnlp-file": ["jnlp"],
  "application/x-keepass2": ["kdbx"],
  "application/x-latex": ["latex"],
  "application/x-lua-bytecode": ["luac"],
  "application/x-lzh-compressed": ["lzh", "lha"],
  "application/x-makeself": ["run"],
  "application/x-mie": ["mie"],
  "application/x-mobipocket-ebook": ["*prc", "mobi"],
  "application/x-ms-application": ["application"],
  "application/x-ms-shortcut": ["lnk"],
  "application/x-ms-wmd": ["wmd"],
  "application/x-ms-wmz": ["wmz"],
  "application/x-ms-xbap": ["xbap"],
  "application/x-msaccess": ["mdb"],
  "application/x-msbinder": ["obd"],
  "application/x-mscardfile": ["crd"],
  "application/x-msclip": ["clp"],
  "application/x-msdos-program": ["*exe"],
  "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
  "application/x-msmediaview": ["mvb", "m13", "m14"],
  "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
  "application/x-msmoney": ["mny"],
  "application/x-mspublisher": ["pub"],
  "application/x-msschedule": ["scd"],
  "application/x-msterminal": ["trm"],
  "application/x-mswrite": ["wri"],
  "application/x-netcdf": ["nc", "cdf"],
  "application/x-ns-proxy-autoconfig": ["pac"],
  "application/x-nzb": ["nzb"],
  "application/x-perl": ["pl", "pm"],
  "application/x-pilot": ["*prc", "*pdb"],
  "application/x-pkcs12": ["p12", "pfx"],
  "application/x-pkcs7-certificates": ["p7b", "spc"],
  "application/x-pkcs7-certreqresp": ["p7r"],
  "application/x-rar-compressed": ["*rar"],
  "application/x-redhat-package-manager": ["rpm"],
  "application/x-research-info-systems": ["ris"],
  "application/x-sea": ["sea"],
  "application/x-sh": ["sh"],
  "application/x-shar": ["shar"],
  "application/x-shockwave-flash": ["swf"],
  "application/x-silverlight-app": ["xap"],
  "application/x-sql": ["*sql"],
  "application/x-stuffit": ["sit"],
  "application/x-stuffitx": ["sitx"],
  "application/x-subrip": ["srt"],
  "application/x-sv4cpio": ["sv4cpio"],
  "application/x-sv4crc": ["sv4crc"],
  "application/x-t3vm-image": ["t3"],
  "application/x-tads": ["gam"],
  "application/x-tar": ["tar"],
  "application/x-tcl": ["tcl", "tk"],
  "application/x-tex": ["tex"],
  "application/x-tex-tfm": ["tfm"],
  "application/x-texinfo": ["texinfo", "texi"],
  "application/x-tgif": ["*obj"],
  "application/x-ustar": ["ustar"],
  "application/x-virtualbox-hdd": ["hdd"],
  "application/x-virtualbox-ova": ["ova"],
  "application/x-virtualbox-ovf": ["ovf"],
  "application/x-virtualbox-vbox": ["vbox"],
  "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
  "application/x-virtualbox-vdi": ["vdi"],
  "application/x-virtualbox-vhd": ["vhd"],
  "application/x-virtualbox-vmdk": ["vmdk"],
  "application/x-wais-source": ["src"],
  "application/x-web-app-manifest+json": ["webapp"],
  "application/x-x509-ca-cert": ["der", "crt", "pem"],
  "application/x-xfig": ["fig"],
  "application/x-xliff+xml": ["*xlf"],
  "application/x-xpinstall": ["xpi"],
  "application/x-xz": ["xz"],
  "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  "audio/vnd.dece.audio": ["uva", "uvva"],
  "audio/vnd.digital-winds": ["eol"],
  "audio/vnd.dra": ["dra"],
  "audio/vnd.dts": ["dts"],
  "audio/vnd.dts.hd": ["dtshd"],
  "audio/vnd.lucent.voice": ["lvp"],
  "audio/vnd.ms-playready.media.pya": ["pya"],
  "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
  "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
  "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
  "audio/vnd.rip": ["rip"],
  "audio/x-aac": ["*aac"],
  "audio/x-aiff": ["aif", "aiff", "aifc"],
  "audio/x-caf": ["caf"],
  "audio/x-flac": ["flac"],
  "audio/x-m4a": ["*m4a"],
  "audio/x-matroska": ["mka"],
  "audio/x-mpegurl": ["m3u"],
  "audio/x-ms-wax": ["wax"],
  "audio/x-ms-wma": ["wma"],
  "audio/x-pn-realaudio": ["ram", "ra"],
  "audio/x-pn-realaudio-plugin": ["rmp"],
  "audio/x-realaudio": ["*ra"],
  "audio/x-wav": ["*wav"],
  "chemical/x-cdx": ["cdx"],
  "chemical/x-cif": ["cif"],
  "chemical/x-cmdf": ["cmdf"],
  "chemical/x-cml": ["cml"],
  "chemical/x-csml": ["csml"],
  "chemical/x-xyz": ["xyz"],
  "image/prs.btif": ["btif", "btf"],
  "image/prs.pti": ["pti"],
  "image/vnd.adobe.photoshop": ["psd"],
  "image/vnd.airzip.accelerator.azv": ["azv"],
  "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
  "image/vnd.djvu": ["djvu", "djv"],
  "image/vnd.dvb.subtitle": ["*sub"],
  "image/vnd.dwg": ["dwg"],
  "image/vnd.dxf": ["dxf"],
  "image/vnd.fastbidsheet": ["fbs"],
  "image/vnd.fpx": ["fpx"],
  "image/vnd.fst": ["fst"],
  "image/vnd.fujixerox.edmics-mmr": ["mmr"],
  "image/vnd.fujixerox.edmics-rlc": ["rlc"],
  "image/vnd.microsoft.icon": ["ico"],
  "image/vnd.ms-dds": ["dds"],
  "image/vnd.ms-modi": ["mdi"],
  "image/vnd.ms-photo": ["wdp"],
  "image/vnd.net-fpx": ["npx"],
  "image/vnd.pco.b16": ["b16"],
  "image/vnd.tencent.tap": ["tap"],
  "image/vnd.valve.source.texture": ["vtf"],
  "image/vnd.wap.wbmp": ["wbmp"],
  "image/vnd.xiff": ["xif"],
  "image/vnd.zbrush.pcx": ["pcx"],
  "image/x-3ds": ["3ds"],
  "image/x-cmu-raster": ["ras"],
  "image/x-cmx": ["cmx"],
  "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
  "image/x-icon": ["*ico"],
  "image/x-jng": ["jng"],
  "image/x-mrsid-image": ["sid"],
  "image/x-ms-bmp": ["*bmp"],
  "image/x-pcx": ["*pcx"],
  "image/x-pict": ["pic", "pct"],
  "image/x-portable-anymap": ["pnm"],
  "image/x-portable-bitmap": ["pbm"],
  "image/x-portable-graymap": ["pgm"],
  "image/x-portable-pixmap": ["ppm"],
  "image/x-rgb": ["rgb"],
  "image/x-tga": ["tga"],
  "image/x-xbitmap": ["xbm"],
  "image/x-xpixmap": ["xpm"],
  "image/x-xwindowdump": ["xwd"],
  "message/vnd.wfa.wsc": ["wsc"],
  "model/vnd.bary": ["bary"],
  "model/vnd.cld": ["cld"],
  "model/vnd.collada+xml": ["dae"],
  "model/vnd.dwf": ["dwf"],
  "model/vnd.gdl": ["gdl"],
  "model/vnd.gtw": ["gtw"],
  "model/vnd.mts": ["*mts"],
  "model/vnd.opengex": ["ogex"],
  "model/vnd.parasolid.transmit.binary": ["x_b"],
  "model/vnd.parasolid.transmit.text": ["x_t"],
  "model/vnd.pytha.pyox": ["pyo", "pyox"],
  "model/vnd.sap.vds": ["vds"],
  "model/vnd.usda": ["usda"],
  "model/vnd.usdz+zip": ["usdz"],
  "model/vnd.valve.source.compiled-map": ["bsp"],
  "model/vnd.vtu": ["vtu"],
  "text/prs.lines.tag": ["dsc"],
  "text/vnd.curl": ["curl"],
  "text/vnd.curl.dcurl": ["dcurl"],
  "text/vnd.curl.mcurl": ["mcurl"],
  "text/vnd.curl.scurl": ["scurl"],
  "text/vnd.dvb.subtitle": ["sub"],
  "text/vnd.familysearch.gedcom": ["ged"],
  "text/vnd.fly": ["fly"],
  "text/vnd.fmi.flexstor": ["flx"],
  "text/vnd.graphviz": ["gv"],
  "text/vnd.in3d.3dml": ["3dml"],
  "text/vnd.in3d.spot": ["spot"],
  "text/vnd.sun.j2me.app-descriptor": ["jad"],
  "text/vnd.wap.wml": ["wml"],
  "text/vnd.wap.wmlscript": ["wmls"],
  "text/x-asm": ["s", "asm"],
  "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  "text/x-component": ["htc"],
  "text/x-fortran": ["f", "for", "f77", "f90"],
  "text/x-handlebars-template": ["hbs"],
  "text/x-java-source": ["java"],
  "text/x-lua": ["lua"],
  "text/x-markdown": ["mkd"],
  "text/x-nfo": ["nfo"],
  "text/x-opml": ["opml"],
  "text/x-org": ["*org"],
  "text/x-pascal": ["p", "pas"],
  "text/x-processing": ["pde"],
  "text/x-sass": ["sass"],
  "text/x-scss": ["scss"],
  "text/x-setext": ["etx"],
  "text/x-sfv": ["sfv"],
  "text/x-suse-ymp": ["ymp"],
  "text/x-uuencode": ["uu"],
  "text/x-vcalendar": ["vcs"],
  "text/x-vcard": ["vcf"],
  "video/vnd.dece.hd": ["uvh", "uvvh"],
  "video/vnd.dece.mobile": ["uvm", "uvvm"],
  "video/vnd.dece.pd": ["uvp", "uvvp"],
  "video/vnd.dece.sd": ["uvs", "uvvs"],
  "video/vnd.dece.video": ["uvv", "uvvv"],
  "video/vnd.dvb.file": ["dvb"],
  "video/vnd.fvt": ["fvt"],
  "video/vnd.mpegurl": ["mxu", "m4u"],
  "video/vnd.ms-playready.media.pyv": ["pyv"],
  "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
  "video/vnd.vivo": ["viv"],
  "video/x-f4v": ["f4v"],
  "video/x-fli": ["fli"],
  "video/x-flv": ["flv"],
  "video/x-m4v": ["m4v"],
  "video/x-matroska": ["mkv", "mk3d", "mks"],
  "video/x-mng": ["mng"],
  "video/x-ms-asf": ["asf", "asx"],
  "video/x-ms-vob": ["vob"],
  "video/x-ms-wm": ["wm"],
  "video/x-ms-wmv": ["wmv"],
  "video/x-ms-wmx": ["wmx"],
  "video/x-ms-wvx": ["wvx"],
  "video/x-msvideo": ["avi"],
  "video/x-sgi-movie": ["movie"],
  "video/x-smv": ["smv"],
  "x-conference/x-cooltalk": ["ice"]
};
Object.freeze(types$1);
const types = {
  "application/andrew-inset": ["ez"],
  "application/appinstaller": ["appinstaller"],
  "application/applixware": ["aw"],
  "application/appx": ["appx"],
  "application/appxbundle": ["appxbundle"],
  "application/atom+xml": ["atom"],
  "application/atomcat+xml": ["atomcat"],
  "application/atomdeleted+xml": ["atomdeleted"],
  "application/atomsvc+xml": ["atomsvc"],
  "application/atsc-dwd+xml": ["dwd"],
  "application/atsc-held+xml": ["held"],
  "application/atsc-rsat+xml": ["rsat"],
  "application/automationml-aml+xml": ["aml"],
  "application/automationml-amlx+zip": ["amlx"],
  "application/bdoc": ["bdoc"],
  "application/calendar+xml": ["xcs"],
  "application/ccxml+xml": ["ccxml"],
  "application/cdfx+xml": ["cdfx"],
  "application/cdmi-capability": ["cdmia"],
  "application/cdmi-container": ["cdmic"],
  "application/cdmi-domain": ["cdmid"],
  "application/cdmi-object": ["cdmio"],
  "application/cdmi-queue": ["cdmiq"],
  "application/cpl+xml": ["cpl"],
  "application/cu-seeme": ["cu"],
  "application/cwl": ["cwl"],
  "application/dash+xml": ["mpd"],
  "application/dash-patch+xml": ["mpp"],
  "application/davmount+xml": ["davmount"],
  "application/docbook+xml": ["dbk"],
  "application/dssc+der": ["dssc"],
  "application/dssc+xml": ["xdssc"],
  "application/ecmascript": ["ecma"],
  "application/emma+xml": ["emma"],
  "application/emotionml+xml": ["emotionml"],
  "application/epub+zip": ["epub"],
  "application/exi": ["exi"],
  "application/express": ["exp"],
  "application/fdf": ["fdf"],
  "application/fdt+xml": ["fdt"],
  "application/font-tdpfr": ["pfr"],
  "application/geo+json": ["geojson"],
  "application/gml+xml": ["gml"],
  "application/gpx+xml": ["gpx"],
  "application/gxf": ["gxf"],
  "application/gzip": ["gz"],
  "application/hjson": ["hjson"],
  "application/hyperstudio": ["stk"],
  "application/inkml+xml": ["ink", "inkml"],
  "application/ipfix": ["ipfix"],
  "application/its+xml": ["its"],
  "application/java-archive": ["jar", "war", "ear"],
  "application/java-serialized-object": ["ser"],
  "application/java-vm": ["class"],
  "application/javascript": ["*js"],
  "application/json": ["json", "map"],
  "application/json5": ["json5"],
  "application/jsonml+json": ["jsonml"],
  "application/ld+json": ["jsonld"],
  "application/lgr+xml": ["lgr"],
  "application/lost+xml": ["lostxml"],
  "application/mac-binhex40": ["hqx"],
  "application/mac-compactpro": ["cpt"],
  "application/mads+xml": ["mads"],
  "application/manifest+json": ["webmanifest"],
  "application/marc": ["mrc"],
  "application/marcxml+xml": ["mrcx"],
  "application/mathematica": ["ma", "nb", "mb"],
  "application/mathml+xml": ["mathml"],
  "application/mbox": ["mbox"],
  "application/media-policy-dataset+xml": ["mpf"],
  "application/mediaservercontrol+xml": ["mscml"],
  "application/metalink+xml": ["metalink"],
  "application/metalink4+xml": ["meta4"],
  "application/mets+xml": ["mets"],
  "application/mmt-aei+xml": ["maei"],
  "application/mmt-usd+xml": ["musd"],
  "application/mods+xml": ["mods"],
  "application/mp21": ["m21", "mp21"],
  "application/mp4": ["*mp4", "*mpg4", "mp4s", "m4p"],
  "application/msix": ["msix"],
  "application/msixbundle": ["msixbundle"],
  "application/msword": ["doc", "dot"],
  "application/mxf": ["mxf"],
  "application/n-quads": ["nq"],
  "application/n-triples": ["nt"],
  "application/node": ["cjs"],
  "application/octet-stream": [
    "bin",
    "dms",
    "lrf",
    "mar",
    "so",
    "dist",
    "distz",
    "pkg",
    "bpk",
    "dump",
    "elc",
    "deploy",
    "exe",
    "dll",
    "deb",
    "dmg",
    "iso",
    "img",
    "msi",
    "msp",
    "msm",
    "buffer"
  ],
  "application/oda": ["oda"],
  "application/oebps-package+xml": ["opf"],
  "application/ogg": ["ogx"],
  "application/omdoc+xml": ["omdoc"],
  "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
  "application/oxps": ["oxps"],
  "application/p2p-overlay+xml": ["relo"],
  "application/patch-ops-error+xml": ["xer"],
  "application/pdf": ["pdf"],
  "application/pgp-encrypted": ["pgp"],
  "application/pgp-keys": ["asc"],
  "application/pgp-signature": ["sig", "*asc"],
  "application/pics-rules": ["prf"],
  "application/pkcs10": ["p10"],
  "application/pkcs7-mime": ["p7m", "p7c"],
  "application/pkcs7-signature": ["p7s"],
  "application/pkcs8": ["p8"],
  "application/pkix-attr-cert": ["ac"],
  "application/pkix-cert": ["cer"],
  "application/pkix-crl": ["crl"],
  "application/pkix-pkipath": ["pkipath"],
  "application/pkixcmp": ["pki"],
  "application/pls+xml": ["pls"],
  "application/postscript": ["ai", "eps", "ps"],
  "application/provenance+xml": ["provx"],
  "application/pskc+xml": ["pskcxml"],
  "application/raml+yaml": ["raml"],
  "application/rdf+xml": ["rdf", "owl"],
  "application/reginfo+xml": ["rif"],
  "application/relax-ng-compact-syntax": ["rnc"],
  "application/resource-lists+xml": ["rl"],
  "application/resource-lists-diff+xml": ["rld"],
  "application/rls-services+xml": ["rs"],
  "application/route-apd+xml": ["rapd"],
  "application/route-s-tsid+xml": ["sls"],
  "application/route-usd+xml": ["rusd"],
  "application/rpki-ghostbusters": ["gbr"],
  "application/rpki-manifest": ["mft"],
  "application/rpki-roa": ["roa"],
  "application/rsd+xml": ["rsd"],
  "application/rss+xml": ["rss"],
  "application/rtf": ["rtf"],
  "application/sbml+xml": ["sbml"],
  "application/scvp-cv-request": ["scq"],
  "application/scvp-cv-response": ["scs"],
  "application/scvp-vp-request": ["spq"],
  "application/scvp-vp-response": ["spp"],
  "application/sdp": ["sdp"],
  "application/senml+xml": ["senmlx"],
  "application/sensml+xml": ["sensmlx"],
  "application/set-payment-initiation": ["setpay"],
  "application/set-registration-initiation": ["setreg"],
  "application/shf+xml": ["shf"],
  "application/sieve": ["siv", "sieve"],
  "application/smil+xml": ["smi", "smil"],
  "application/sparql-query": ["rq"],
  "application/sparql-results+xml": ["srx"],
  "application/sql": ["sql"],
  "application/srgs": ["gram"],
  "application/srgs+xml": ["grxml"],
  "application/sru+xml": ["sru"],
  "application/ssdl+xml": ["ssdl"],
  "application/ssml+xml": ["ssml"],
  "application/swid+xml": ["swidtag"],
  "application/tei+xml": ["tei", "teicorpus"],
  "application/thraud+xml": ["tfi"],
  "application/timestamped-data": ["tsd"],
  "application/toml": ["toml"],
  "application/trig": ["trig"],
  "application/ttml+xml": ["ttml"],
  "application/ubjson": ["ubj"],
  "application/urc-ressheet+xml": ["rsheet"],
  "application/urc-targetdesc+xml": ["td"],
  "application/voicexml+xml": ["vxml"],
  "application/wasm": ["wasm"],
  "application/watcherinfo+xml": ["wif"],
  "application/widget": ["wgt"],
  "application/winhlp": ["hlp"],
  "application/wsdl+xml": ["wsdl"],
  "application/wspolicy+xml": ["wspolicy"],
  "application/xaml+xml": ["xaml"],
  "application/xcap-att+xml": ["xav"],
  "application/xcap-caps+xml": ["xca"],
  "application/xcap-diff+xml": ["xdf"],
  "application/xcap-el+xml": ["xel"],
  "application/xcap-ns+xml": ["xns"],
  "application/xenc+xml": ["xenc"],
  "application/xfdf": ["xfdf"],
  "application/xhtml+xml": ["xhtml", "xht"],
  "application/xliff+xml": ["xlf"],
  "application/xml": ["xml", "xsl", "xsd", "rng"],
  "application/xml-dtd": ["dtd"],
  "application/xop+xml": ["xop"],
  "application/xproc+xml": ["xpl"],
  "application/xslt+xml": ["*xsl", "xslt"],
  "application/xspf+xml": ["xspf"],
  "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
  "application/yang": ["yang"],
  "application/yin+xml": ["yin"],
  "application/zip": ["zip"],
  "audio/3gpp": ["*3gpp"],
  "audio/aac": ["adts", "aac"],
  "audio/adpcm": ["adp"],
  "audio/amr": ["amr"],
  "audio/basic": ["au", "snd"],
  "audio/midi": ["mid", "midi", "kar", "rmi"],
  "audio/mobile-xmf": ["mxmf"],
  "audio/mp3": ["*mp3"],
  "audio/mp4": ["m4a", "mp4a"],
  "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  "audio/ogg": ["oga", "ogg", "spx", "opus"],
  "audio/s3m": ["s3m"],
  "audio/silk": ["sil"],
  "audio/wav": ["wav"],
  "audio/wave": ["*wav"],
  "audio/webm": ["weba"],
  "audio/xm": ["xm"],
  "font/collection": ["ttc"],
  "font/otf": ["otf"],
  "font/ttf": ["ttf"],
  "font/woff": ["woff"],
  "font/woff2": ["woff2"],
  "image/aces": ["exr"],
  "image/apng": ["apng"],
  "image/avci": ["avci"],
  "image/avcs": ["avcs"],
  "image/avif": ["avif"],
  "image/bmp": ["bmp", "dib"],
  "image/cgm": ["cgm"],
  "image/dicom-rle": ["drle"],
  "image/dpx": ["dpx"],
  "image/emf": ["emf"],
  "image/fits": ["fits"],
  "image/g3fax": ["g3"],
  "image/gif": ["gif"],
  "image/heic": ["heic"],
  "image/heic-sequence": ["heics"],
  "image/heif": ["heif"],
  "image/heif-sequence": ["heifs"],
  "image/hej2k": ["hej2"],
  "image/hsj2": ["hsj2"],
  "image/ief": ["ief"],
  "image/jls": ["jls"],
  "image/jp2": ["jp2", "jpg2"],
  "image/jpeg": ["jpeg", "jpg", "jpe"],
  "image/jph": ["jph"],
  "image/jphc": ["jhc"],
  "image/jpm": ["jpm", "jpgm"],
  "image/jpx": ["jpx", "jpf"],
  "image/jxl": ["jxl"],
  "image/jxr": ["jxr"],
  "image/jxra": ["jxra"],
  "image/jxrs": ["jxrs"],
  "image/jxs": ["jxs"],
  "image/jxsc": ["jxsc"],
  "image/jxsi": ["jxsi"],
  "image/jxss": ["jxss"],
  "image/ktx": ["ktx"],
  "image/ktx2": ["ktx2"],
  "image/png": ["png"],
  "image/sgi": ["sgi"],
  "image/svg+xml": ["svg", "svgz"],
  "image/t38": ["t38"],
  "image/tiff": ["tif", "tiff"],
  "image/tiff-fx": ["tfx"],
  "image/webp": ["webp"],
  "image/wmf": ["wmf"],
  "message/disposition-notification": ["disposition-notification"],
  "message/global": ["u8msg"],
  "message/global-delivery-status": ["u8dsn"],
  "message/global-disposition-notification": ["u8mdn"],
  "message/global-headers": ["u8hdr"],
  "message/rfc822": ["eml", "mime"],
  "model/3mf": ["3mf"],
  "model/gltf+json": ["gltf"],
  "model/gltf-binary": ["glb"],
  "model/iges": ["igs", "iges"],
  "model/jt": ["jt"],
  "model/mesh": ["msh", "mesh", "silo"],
  "model/mtl": ["mtl"],
  "model/obj": ["obj"],
  "model/prc": ["prc"],
  "model/step+xml": ["stpx"],
  "model/step+zip": ["stpz"],
  "model/step-xml+zip": ["stpxz"],
  "model/stl": ["stl"],
  "model/u3d": ["u3d"],
  "model/vrml": ["wrl", "vrml"],
  "model/x3d+binary": ["*x3db", "x3dbz"],
  "model/x3d+fastinfoset": ["x3db"],
  "model/x3d+vrml": ["*x3dv", "x3dvz"],
  "model/x3d+xml": ["x3d", "x3dz"],
  "model/x3d-vrml": ["x3dv"],
  "text/cache-manifest": ["appcache", "manifest"],
  "text/calendar": ["ics", "ifb"],
  "text/coffeescript": ["coffee", "litcoffee"],
  "text/css": ["css"],
  "text/csv": ["csv"],
  "text/html": ["html", "htm", "shtml"],
  "text/jade": ["jade"],
  "text/javascript": ["js", "mjs"],
  "text/jsx": ["jsx"],
  "text/less": ["less"],
  "text/markdown": ["md", "markdown"],
  "text/mathml": ["mml"],
  "text/mdx": ["mdx"],
  "text/n3": ["n3"],
  "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  "text/richtext": ["rtx"],
  "text/rtf": ["*rtf"],
  "text/sgml": ["sgml", "sgm"],
  "text/shex": ["shex"],
  "text/slim": ["slim", "slm"],
  "text/spdx": ["spdx"],
  "text/stylus": ["stylus", "styl"],
  "text/tab-separated-values": ["tsv"],
  "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
  "text/turtle": ["ttl"],
  "text/uri-list": ["uri", "uris", "urls"],
  "text/vcard": ["vcard"],
  "text/vtt": ["vtt"],
  "text/wgsl": ["wgsl"],
  "text/xml": ["*xml"],
  "text/yaml": ["yaml", "yml"],
  "video/3gpp": ["3gp", "3gpp"],
  "video/3gpp2": ["3g2"],
  "video/h261": ["h261"],
  "video/h263": ["h263"],
  "video/h264": ["h264"],
  "video/iso.segment": ["m4s"],
  "video/jpeg": ["jpgv"],
  "video/jpm": ["*jpm", "*jpgm"],
  "video/mj2": ["mj2", "mjp2"],
  "video/mp2t": ["ts", "m2t", "m2ts", "mts"],
  "video/mp4": ["mp4", "mp4v", "mpg4"],
  "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  "video/ogg": ["ogv"],
  "video/quicktime": ["qt", "mov"],
  "video/webm": ["webm"]
};
Object.freeze(types);
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mime_extensionToType, _Mime_typeToExtension, _Mime_typeToExtensions;
class Mime {
  constructor(...args) {
    _Mime_extensionToType.set(this, /* @__PURE__ */ new Map());
    _Mime_typeToExtension.set(this, /* @__PURE__ */ new Map());
    _Mime_typeToExtensions.set(this, /* @__PURE__ */ new Map());
    for (const arg of args) {
      this.define(arg);
    }
  }
  define(typeMap, force = false) {
    for (let [type, extensions] of Object.entries(typeMap)) {
      type = type.toLowerCase();
      extensions = extensions.map((ext) => ext.toLowerCase());
      if (!__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").has(type)) {
        __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").set(type, /* @__PURE__ */ new Set());
      }
      const allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
      let first = true;
      for (let extension of extensions) {
        const starred = extension.startsWith("*");
        extension = starred ? extension.slice(1) : extension;
        allExtensions == null ? void 0 : allExtensions.add(extension);
        if (first) {
          __classPrivateFieldGet(this, _Mime_typeToExtension, "f").set(type, extension);
        }
        first = false;
        if (starred)
          continue;
        const currentType = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(extension);
        if (currentType && currentType != type && !force) {
          throw new Error(`"${type} -> ${extension}" conflicts with "${currentType} -> ${extension}". Pass \`force=true\` to override this definition.`);
        }
        __classPrivateFieldGet(this, _Mime_extensionToType, "f").set(extension, type);
      }
    }
    return this;
  }
  getType(path) {
    if (typeof path !== "string")
      return null;
    const last = path.replace(/^.*[/\\]/, "").toLowerCase();
    const ext = last.replace(/^.*\./, "").toLowerCase();
    const hasPath = last.length < path.length;
    const hasDot = ext.length < last.length - 1;
    if (!hasDot && hasPath)
      return null;
    return __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(ext) ?? null;
  }
  getExtension(type) {
    var _a2;
    if (typeof type !== "string")
      return null;
    type = (_a2 = type == null ? void 0 : type.split) == null ? void 0 : _a2.call(type, ";")[0];
    return (type && __classPrivateFieldGet(this, _Mime_typeToExtension, "f").get(type.trim().toLowerCase())) ?? null;
  }
  getAllExtensions(type) {
    if (typeof type !== "string")
      return null;
    return __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type.toLowerCase()) ?? null;
  }
  _freeze() {
    this.define = () => {
      throw new Error("define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances");
    };
    Object.freeze(this);
    for (const extensions of __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").values()) {
      Object.freeze(extensions);
    }
    return this;
  }
  _getTestState() {
    return {
      types: __classPrivateFieldGet(this, _Mime_extensionToType, "f"),
      extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, "f")
    };
  }
}
_Mime_extensionToType = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtension = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtensions = /* @__PURE__ */ new WeakMap();
const mime = new Mime(types, types$1)._freeze();
const base642dataurl = (filepath, base64) => {
  const contentType = mime.getType(filepath);
  return `data:${contentType};base64,${base64}`;
};
const office2json = async (u82) => {
  let json = {};
  const files = await unzip(u82);
  await Promise.all(
    Object.entries(files).map(async ([filepath, file]) => {
      if (filepath.endsWith("/")) {
        return;
      }
      let content;
      if (filepath.endsWith(".xml") || filepath.endsWith(".rels")) {
        const xml = u82str(file);
        content = await xml2json(xml);
      } else {
        const base64 = u82base64(file);
        content = base642dataurl(filepath, base64);
      }
      json[filepath] = content;
    })
  );
  return json;
};
const json2office = async (json) => {
  let files = {};
  await Promise.all(
    Object.entries(json).map(async ([filepath, content]) => {
      if (filepath.endsWith(".xml") || filepath.endsWith(".rels")) {
        const xml = await json2xml(content);
        files[filepath] = str2u8(xml);
      } else {
        const base64 = content.split(";")[1].slice(7);
        files[filepath] = base642u8(base64);
      }
    })
  );
  return zip(files);
};
const RE = /\{\{(.*?)\}\}/g;
const template = (json, data = {}) => {
  const json_string = JSON.stringify(json, (key, value) => {
    if (typeof value !== "string" || !RE.test(value)) {
      return value;
    }
    const new_value = value.replace(RE, (m, d) => {
      const part = data[d] || d;
      return part;
    });
    return new_value;
  });
  const new_json = JSON.parse(json_string);
  return new_json;
};
const _readFile = async (file, action) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (e) => resolve(e.target.result);
  reader.onerror = reject;
  reader[action](file);
});
const _writeFile = async (name, blob) => {
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 100);
};
const u82blob = async (u82, name) => {
  const type = name.endsWith(".docx") ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : name.endsWith(".pptx") ? "application/vnd.openxmlformats-officedocument.presentationml.presentation" : name.endsWith("xlsx") ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "application/zip";
  return new Blob([u82], { type });
};
const readFile = async (file) => {
  const from = await _readFile(file, "readAsArrayBuffer");
  const u82 = new Uint8Array(from);
  const json = await office2json(u82);
  return json;
};
const readFileAsDataURL = async (file) => {
  const from = await _readFile(file, "readAsDataURL");
  return from;
};
const writeFile = async (name, json) => {
  const to = await json2office(json);
  const blob = await u82blob(to, name);
  await _writeFile(name, blob);
};
const $pre = document.querySelector("pre");
const $input = document.querySelector("input[name=office]");
const $button = document.querySelector("button[name=writeFile]");
const $texts = document.querySelector("ol[name=texts]");
const $images = document.querySelector("ol[name=images]");
const $copy = document.querySelector("button[name=copy]");
let filename;
$input.onchange = async () => {
  const file = $input.files[0];
  if (!file) {
    return;
  }
  filename = "output-" + file.name;
  const json = await readFile(file);
  $pre.textContent = JSON.stringify(json, null, 2);
  $texts.innerHTML = ($pre.textContent.match(/\{\{(.*?)\}\}/g) || []).map((d) => d.slice(2, -2)).map(
    (d) => `
        <li>
          <label><span style="margin-right:1em;">${d}</span><input type="text" data-key="${d}" /></label>
        </li>
        `
  ).join("");
  $images.innerHTML = Object.entries(json).filter(([key]) => key.includes("media/image")).sort((a, b) => a[0].match(/\d+/) - b[0].match(/\d+/)).map(
    ([key, value]) => `
          <li>
            <h3>${key}</h3>
            <div style="display: flex;">
              <div>
                <img src="${value}" style="width:100px;height:auto;margin-right:1em;" />
              </div>

              <div>
                <input type="file" name="image_input" data-file-name="${key}" accept=".gif,.jpg,.png" />
                <img style="display:none;width:100px;height:auto;" />
              </div>
          </li>
          `
  ).join("");
  $copy.style.display = "";
};
$button.onclick = async () => {
  if (!filename) {
    return;
  }
  const data = Array.from(
    $texts.querySelectorAll("input[type=text]")
  ).reduce((m, $d) => {
    const key = $d.dataset.key;
    const value = $d.value.trim();
    if (!value) {
      return;
    }
    return {
      ...m,
      [key]: value
    };
  }, {});
  const json = JSON.parse($pre.textContent);
  const new_json = template(json, data);
  await writeFile(filename, new_json);
};
$images.onclick = async (e) => {
  if (e.target.tagName.toLowerCase() !== "img") {
    return;
  }
  const img = e.target;
  img.style.width = img.style.width === "100px" ? "100%" : "100px";
};
$images.onchange = async (e) => {
  if (e.target.tagName.toLowerCase() !== "input") {
    return;
  }
  const d = e.target;
  const file = d.files[0];
  if (!file) {
    return;
  }
  const dataurl = await readFileAsDataURL(file);
  d.nextElementSibling.style.display = "";
  d.nextElementSibling.src = dataurl;
  const fileName = d.dataset.fileName;
  const pattern = new RegExp(`"${fileName}": "data:.*?;base64,.*?"`);
  $pre.textContent = $pre.textContent.replace(
    pattern,
    `"${fileName}": "${dataurl}"`
  );
};
$copy.onclick = async (e) => {
  try {
    await navigator.clipboard.writeText($pre.textContent);
    $copy.textContent = "copied";
    setTimeout(() => {
      $copy.textContent = "copy";
    }, 500);
  } catch (e2) {
    console.log("copy error", e2.message);
  }
};
