import Quill from 'quill'
let Parchment = Quill.import('parchment')
class IndentStyleAttributor extends Parchment.Attributor.Style {
	value(node) {
        return super.value(node)
	}
	add(node, value) {
		if (value == '1') {
			node.style.setProperty('text-indent', '2em');
		}
		if (value == '-1') {
			node.style.removeProperty('text-indent');
		}
    }
}
let IndentStyle = new IndentStyleAttributor('indent', 'text-indent', {
    scope: Parchment.Scope.BLOCK,
    whitelist: [true, false]
});

export default IndentStyle;
