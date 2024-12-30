using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_API.Migrations
{
    public partial class roleSeedFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "20b81dfc-1904-47c5-8262-4063199ff4ac", "b1a660d1-4355-4c1e-aaa0-a280b825ce37", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a7ff5780-1086-4b47-b54b-fd3e849ab52d", "37eaa1a0-b040-421c-bce0-0ff558cb66a9", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20b81dfc-1904-47c5-8262-4063199ff4ac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7ff5780-1086-4b47-b54b-fd3e849ab52d");
        }
    }
}
