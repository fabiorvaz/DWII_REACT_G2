var EmpresaBox = React.createClass({
	handleAddSubmit: function(id, nome, empresa) {
	    var empresas = this.state.data;
	    var newEmpresas = empresas.concat([empresa]);
	    this.setState({data: newEmpresas});
		/*
		$.ajax({
		      url: "services/library/book/"+isbn+"?title="+title,
		      dataType: 'json',
		      type: 'PUT',
		      success: function(data) {
		        this.setState({data: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });*/
	},
	getInitialState: function() {
	    return {data: data};
	},
	render: function() {
		return (
			<div>
				<div>
					<FormAdicionar onEmpresaSubmit={this.handleAddSubmit} />
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

var FormAdicionar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		var nome = this.refs.nome.value.trim();
		if (!id || !nome) {
		  return;
		}
		this.props.onEmpresaSubmit(id, nome, {id: id,nome: nome});
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
	render: function()
	{
		return(
			<form name="adicionar" onSubmit={this.handleSubmit}>
				ID: <input type="text" placeholder="id" ref="id" />
				<br />
				Nome: <input type="text" placeholder="nome" ref="nome" />
				<br />
				<input type="submit" value="Adicionar" />
			</form>
		);
	}
});

var data = [ {id:"1", nome: "Expresso rio guaíba"}, {id:"2", nome: "Sogal"},{id:"3", nome: "Viação pelicano"}];
//pollInterval={10000}
ReactDOM.render(
		<EmpresaBox data={data} pollInterval={200} />,
		document.getElementById('content')
		);