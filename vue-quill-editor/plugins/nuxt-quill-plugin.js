import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'

import BoldStyle from './quill/bold'
import ItalicStyle from './quill/italic'
import UnderlineStyle from './quill/underline'
import StrikeStyle from './quill/strike'
import IndentStyle from './quill/indent'

var Align = VueQuillEditor.Quill.import('attributors/style/align');
VueQuillEditor.Quill.register(Align, true);
VueQuillEditor.Quill.register({
    "formats/bold": BoldStyle,
    "formats/italic": ItalicStyle,
    "formats/underline": UnderlineStyle,
    "formats/strike": StrikeStyle,
    "formats/indent": IndentStyle,
},true)

Vue.use(VueQuillEditor)
