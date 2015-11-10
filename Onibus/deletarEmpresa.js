/**
 * 
 */
var EmpresaBox = React.createClass({
	handleDeleteSubmit: function(id) {
		var rows = this.state.data.filter(function(elem) {
            return elem.id != id;
        });
		this.setState({data:rows});
		/*
		$.ajax({
			  url: "services/library/book/"+isbn,
			  dataType: 'json',
			  type: 'DELETE',
			  success: function(data) {
				this.setState({data: data});
			  }.bind(this),
			  error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
			*/
			
	},
	getInitialState: function() {
	    return {data: data};
	},
	render: function() {
		return (
			<div>
				<div>
					<FormDeletar onEmpresaSubmit={this.handleDeleteSubmit} />
				</div>
				<div>
					<EmpresaLista data={this.state.data} onEmpresaSubmit={this.handleDeleteSubmit} />
				</div>
			</div>
		);
	}
});

var EmpresaLista = React.createClass({
	handleDeleteSubmit: function(id) {
		this.props.onEmpresaSubmit(id);
	},
	render: function() {
		var empresasNodes = this.props.data.map(function(empresa)
			{
				return (
					<Empresa id={empresa.id} nome={empresa.nome} onEmpresaSubmit={this.handleDeleteSubmit} />
				);
			}.bind(this)
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
							<th>
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
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		if (!id) {
		  return;
		}
		this.props.onEmpresaSubmit(id);
		this.refs.id.value = '';
		return;
	},
	render: function()
	{
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.nome}</td>
				<td>
					<form onSubmit={this.handleSubmit}>
						<input type="hidden" value={this.props.id} ref="id" />
						<input type="submit" value="Deletar" />
					</form>
				</td>
			</tr>
		);
	}
})

var FormDeletar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		if (!id) {
		  return;
		}
		this.props.onEmpresaSubmit(id);
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
	render: function()
	{
		return(
			<form name="Deletar" onSubmit={this.handleSubmit}>
				ID: <input type="text" placeholder="id" ref="id" />
				<br />
				<input type="submit" value="Deletar" />
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