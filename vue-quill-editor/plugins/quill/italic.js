import Quill from 'quill'
let Parchment = Quill.import('parchment')
class ItalicStyleAttributor extends Parchment.Attributor.Style {
	value(node) {
		return super.value(node)
	}
	add(node, value) {
		node.style.setProperty('font-style', 'italic');
		return true;
	}
	remove(node) {
		node.style.removeProperty('font-style');
	}
}
let ItalicStyle = new ItalicStyleAttributor('italic', 'font-style', {
	scope: Parchment.Scope.INLINE,
	whitelist: [true, false]
});

export default ItalicStyle;
