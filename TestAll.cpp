#include <iostream>
#include <vector>
#include "UserClasses.h"
#include "PostClasses.h"
#include "CommentMessage.h"
using namespace std;

int main() {
    cout << "===============================" << endl;
    cout << "  MÔ PHỎNG MẠNG XÃ HỘI NHÓM" << endl;
    cout << "===============================" << endl;

    
    cout << "\n=== PHẦN 1: KIỂM THỬ USER ===" << endl;

    User* admin = new Admin("admin1", "adminpass", "admin@mail.com");
    User* mod = new Moderator("mod1", "modpass", "mod@mail.com");
    User* user = new NormalUser("user1", "userpass", "user@mail.com");

    vector<User*> users = {admin, mod, user};

    for (User* u : users)
        cout << u->getUsername() << " → Role: " << u->getRole() << endl;

    cout << "\nThử đổi password người dùng thường:" << endl;
    user->setPassword("123"); 
    user->setPassword("newpass123");
    cout << "Xác minh mật khẩu mới: "
         << (user->verifyPassword("newpass123") ? "✅ Đúng" : "❌ Sai") << endl;

    ((Admin*)admin)->deletePost(10, "user1");
    ((Moderator*)mod)->hidePost(5, "spam");
    ((NormalUser*)user)->createPost("Hôm nay trời đẹp!");

    
    cout << "\n=== PHẦN 2: KIỂM THỬ POST ===" << endl;
    vector<Post*> posts;

    posts.push_back(new TextPost("Bài viết đầu tiên!", "user1", "plain"));
    posts.push_back(new ImagePost("Cảnh hoàng hôn", "mod1", "sunset.jpg"));
    posts.push_back(new VideoPost("Video vui nhộn", "admin1", "funny.mp4", 120));

    for (auto p : posts) {
        p->display();
        cout << endl;
    }

    
    posts[0]->setContent("");
    posts[0]->setContent("Bài viết đầu tiên - cập nhật!");
    posts[0]->display();

    
    cout << "\n=== PHẦN 3: KIỂM THỬ COMMENT & MESSAGE ===" << endl;

    Comment c1(1, "Rất hay!", "user2", 101);
    c1.display();
    c1.setContent("");
    c1.setContent("Mình rất thích bài này!");
    c1.display();

    Message m1(1, "Chào admin, bạn có rảnh không?", "user1", "admin1");
    m1.display();
    m1.setContent("");
    m1.setContent("Nhờ bạn duyệt bài giúp mình nhé!");
    m1.display();

    
    cout << "\n=== TỔNG KẾT ===" << endl;
    cout << "Đã kiểm thử thành công: Encapsulation + Inheritance + Polymorphism.\n";

    
    for (auto p : posts) delete p;
    for (auto u : users) delete u;

    cout << "\n✅ KẾT THÚC CHƯƠNG TRÌNH ✅" << endl;
    return 0;
}
