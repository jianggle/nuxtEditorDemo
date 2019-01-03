import Quill from 'quill'
let Parchment = Quill.import('parchment')
class UnderlineStyleAttributor extends Parchment.Attributor.Style {
	value(node) {
		return super.value(node)
	}
	add(node, value) {
		node.style.setProperty('text-decoration', 'underline');
		return true;
	}
	remove(node) {
		node.style.removeProperty('text-decoration');
	}
}
let UnderlineStyle = new UnderlineStyleAttributor('underline', 'text-decoration', {
	scope: Parchment.Scope.INLINE,
	whitelist: [true, false]
});

export default UnderlineStyle;
