using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_API.Migrations
{
    public partial class OneToOneRelationShipss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bc3bdd6b-a897-46b2-b489-a340e22216be");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d714de53-57ab-43f3-8421-3b994760c071");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "53467b95-1964-44c1-aee5-f2cbcca70c52", "5e0e829e-aaa3-4e2b-a2c9-3e0a29d27b7d", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d2d3085b-3113-4dc8-aa95-82aeb7a32efc", "e994b124-b0e6-47da-b102-78ebd1cb8290", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "53467b95-1964-44c1-aee5-f2cbcca70c52");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d2d3085b-3113-4dc8-aa95-82aeb7a32efc");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "bc3bdd6b-a897-46b2-b489-a340e22216be", "cb6abbc9-4536-4d57-a79b-0bf48b5a6d8a", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d714de53-57ab-43f3-8421-3b994760c071", "54812d19-b231-4962-ba97-99511a3a569f", "User", "USER" });
        }
    }
}
