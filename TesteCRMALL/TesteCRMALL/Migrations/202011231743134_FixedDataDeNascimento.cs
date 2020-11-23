namespace TesteCrmall.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixedDataDeNascimento : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Clientes", "DataDeNascimento", c => c.DateTime(nullable: false, precision: 0));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Clientes", "DataDeNascimento", c => c.String(unicode: false));
        }
    }
}
