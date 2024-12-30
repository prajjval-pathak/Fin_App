using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_API.Migrations
{
    public partial class OneToOneRelationShip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "64738899-7254-4a2b-9731-f9b11214e1c7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7a6486f6-7be2-4430-959c-f9e6fd316807");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "comments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3c82834a-0ea5-4c9e-b841-74fe2f1915e2", "2507a53b-6d7d-4bae-85f9-83e42afec795", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d0b48793-42d0-4eb3-8301-4e3aa1864b8b", "a0e88634-dc00-48ce-be41-37a09f0ca450", "User", "USER" });

            migrationBuilder.CreateIndex(
                name: "IX_comments_AppUserId",
                table: "comments",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_comments_AspNetUsers_AppUserId",
                table: "comments",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_AspNetUsers_AppUserId",
                table: "comments");

            migrationBuilder.DropIndex(
                name: "IX_comments_AppUserId",
                table: "comments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c82834a-0ea5-4c9e-b841-74fe2f1915e2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d0b48793-42d0-4eb3-8301-4e3aa1864b8b");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "comments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "64738899-7254-4a2b-9731-f9b11214e1c7", "b948cc41-a973-4202-99d8-7baa627b102e", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7a6486f6-7be2-4430-959c-f9e6fd316807", "27cf0dc4-66e1-4330-9b31-d1cfc0ae7b10", "Admin", "ADMIN" });
        }
    }
}
