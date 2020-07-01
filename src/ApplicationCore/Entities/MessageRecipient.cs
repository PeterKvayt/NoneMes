
namespace ApplicationCore.Entities
{
    public sealed class MessageRecipient
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int MessageId { get; set; }
    }
}
