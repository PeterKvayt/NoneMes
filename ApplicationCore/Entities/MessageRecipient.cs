
namespace ApplicationCore.Entities
{
    class MessageRecipient: BaseEntity
    {
        public string UserId { get; set; }
        public int MessageId { get; set; }
    }
}
