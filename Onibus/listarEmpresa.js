/**
 * 
 */
var EmpresaBox = React.createClass({
	onFiltroChange: function(filtro)
	{
		if(!filtro)
		{
			this.setState({data:[]});
			this.setState({data:data});
			return;
		}
		var rows = this.state.data.filter(function(elem) {
			var iValue =elem.nome.toLowerCase().indexOf(filtro.toLowerCase());
            return (iValue != -1);
        });
		this.setState({data:[]});
		this.setState({data:rows});
	},
	getInitialState: function() {
	    return {data: data};
	},
	render: function() {
		return (
			<div>
				<div>
					<FormFiltrar onFiltroChange={this.onFiltroChange} />
				</div>
				<div>
					<EmpresaLista data={this.state.data} />
				</div>
			</div>
		);
	}
});

var EmpresaLista = React.createClass({
	render: function() {
		var empresasNodes = this.props.data.map(function(empresa)
			{
				return (
					<Empresa id={empresa.id} nome={empresa.nome} />
				);
			}
		);
		return (
				<table>
					<thead>
						<tr>
							<th>
								Código
							</th>
							<th>
								Nome
							</th>
						</tr>
					</thead>
					<tbody>
						{empresasNodes}
	    			</tbody>
				</table>
				);
	}
});

var Empresa = React.createClass({
	render: function()
	{
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.nome}</td>
			</tr>
		);
	}
})

var FormFiltrar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var filtro = this.refs.filtro.value.trim();
		this.props.onFiltroChange(filtro);
	},
	render: function()
	{
		return(
			<form name="Deletar" onSubmit={this.handleSubmit}>
				Filtro: <input type="text" placeholder="filtro" ref="filtro" />
				<br />
				<input type="submit" value="Pesquisar" />
			</form>
		);
	}
});

var data = [ {id:"1", nome: "Expresso rio guaíba"}, {id:"2", nome: "Sogal"},{id:"3", nome: "Viação pelicano"}];
//pollInterval={10000}
ReactDOM.render(
	<EmpresaBox data={data} />,
	document.getElementById('content')
);