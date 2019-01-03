import Quill from 'quill'
let Parchment = Quill.import('parchment')
class BoldStyleAttributor extends Parchment.Attributor.Style {
	value(node) {
		return super.value(node)
	}
	add(node, value) {
		node.style.setProperty('font-weight', 'bold');
		return true;
	}
	remove(node) {
		node.style.removeProperty('font-weight');
	}
}
let BoldStyle = new BoldStyleAttributor('bold', 'font-weight', {
	scope: Parchment.Scope.INLINE,
	whitelist: [true, false]
});

export default BoldStyle;
