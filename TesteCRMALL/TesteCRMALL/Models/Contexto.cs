using MySql.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TesteCrmall.Models
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class Contexto : DbContext
    {
        public Contexto()
                     : base("Contexto")
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
    }
}