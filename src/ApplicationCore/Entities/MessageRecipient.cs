
namespace ApplicationCore.Entities
{
<<<<<<< HEAD:ApplicationCore/Entities/MessageRecipient.cs
    public class MessageRecipient: BaseEntity
=======
    public sealed class MessageRecipient
>>>>>>> 66e9fb85f5a9eb66a02900cab1c871ea15d3f8b6:src/ApplicationCore/Entities/MessageRecipient.cs
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int MessageId { get; set; }
    }
}
