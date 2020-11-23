namespace TesteCrmall.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrectNumber : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Clientes", "Numero", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Clientes", "Numero", c => c.String(unicode: false));
        }
    }
}
