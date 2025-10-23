// 🌟 SocialHub Premium - Enhanced Social Media Prototype JavaScript

// ===== GLOBAL VARIABLES & CONFIGURATION =====
class SocialHub {
    constructor() {
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.messages = [];
        this.friendState = {};
        this.activeUser = null;
        this.currentPage = 1;
        this.postsPerPage = 5;
        this.theme = 'dark';
        
        this.init();
    }

    // ===== INITIALIZATION =====
    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.setupTheme();
        this.showLoadingScreen();
        
        // Simulate data loading
        setTimeout(() => {
            this.hideLoadingScreen();
            this.renderAll();
        }, 2000);
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshData());
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });
        
        // User management
        document.getElementById('addUserBtn').addEventListener('click', () => this.showUserModal());
        document.getElementById('saveUserBtn').addEventListener('click', () => this.saveNewUser());
        document.getElementById('cancelUserBtn').addEventListener('click', () => this.hideUserModal());
        document.querySelector('.close-modal').addEventListener('click', () => this.hideUserModal());
        
        // Post creation
        document.getElementById('createPostBtn').addEventListener('click', () => this.createPost());
        document.getElementById('postType').addEventListener('change', () => this.updatePostExtraFields());
        document.getElementById('postContent').addEventListener('input', () => this.updateCharCount());
        
        // Post filtering and sorting
        document.getElementById('postFilter').addEventListener('change', () => this.renderPosts());
        document.getElementById('sortPosts').addEventListener('click', () => this.togglePostSort());
        document.getElementById('loadMorePosts').addEventListener('click', () => this.loadMorePosts());
        
        // Friends tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchFriendsTab(e));
        });
        
        // Messages
        document.getElementById('newMessageBtn').addEventListener('click', () => this.startNewMessage());
        document.getElementById('sendMessageBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // User search
        document.getElementById('userSearch').addEventListener('input', () => this.filterUsers());
        
        // Modal backdrop click
        document.getElementById('userModal').addEventListener('click', (e) => {
            if (e.target.id === 'userModal') this.hideUserModal();
        });
    }

    // ===== DATA MANAGEMENT =====
    loadInitialData() {
        // Load users
        this.users = [
            { 
                id: 1, 
                username: 'admin1', 
                role: 'Admin', 
                email: 'admin@socialhub.com',
                joinDate: '2024-01-15',
                isOnline: true
            },
            { 
                id: 2, 
                username: 'moderator1', 
                role: 'Moderator', 
                email: 'mod@socialhub.com',
                joinDate: '2024-02-20',
                isOnline: true
            },
            { 
                id: 3, 
                username: 'john_doe', 
                role: 'User', 
                email: 'john@example.com',
                joinDate: '2024-03-10',
                isOnline: true
            },
            { 
                id: 4, 
                username: 'jane_doe', 
                role: 'User', 
                email: 'jane@example.com',
                joinDate: '2024-03-12',
                isOnline: false
            },
            { 
                id: 5, 
                username: 'alice_smith', 
                role: 'User', 
                email: 'alice@example.com',
                joinDate: '2024-03-15',
                isOnline: true
            },
            { 
                id: 6, 
                username: 'bob_johnson', 
                role: 'User', 
                email: 'bob@example.com',
                joinDate: '2024-03-18',
                isOnline: false
            }
        ];

        // Load posts
        this.posts = [
            { 
                id: 1, 
                type: 'text', 
                author: 'john_doe', 
                content: 'Chào mọi người! Đây là bài viết đầu tiên của tôi trên SocialHub. Rất vui được làm quen với tất cả mọi người!', 
                extra: 'plain_text', 
                timestamp: new Date('2024-03-20T10:30:00').toLocaleString('vi-VN'),
                isDeleted: false, 
                isVerified: true, 
                verifiedBy: 'moderator1',
                likes: 15,
                shares: 3
            },
            { 
                id: 2, 
                type: 'image', 
                author: 'jane_doe', 
                content: 'Cảnh hoàng hôn tuyệt đẹp từ chuyến đi cuối tuần của tôi!', 
                extra: 'sunset.jpg', 
                timestamp: new Date('2024-03-20T14:20:00').toLocaleString('vi-VN'),
                isDeleted: false, 
                isVerified: false, 
                verifiedBy: '',
                likes: 28,
                shares: 7
            },
            { 
                id: 3, 
                type: 'video', 
                author: 'alice_smith', 
                content: 'Hướng dẫn nấu món ăn mới cho bữa tối', 
                extra: 'cooking_tutorial.mp4', 
                duration: 120, 
                timestamp: new Date('2024-03-19T16:45:00').toLocaleString('vi-VN'),
                isDeleted: false, 
                isVerified: true, 
                verifiedBy: 'admin1',
                likes: 42,
                shares: 12
            },
            { 
                id: 4, 
                type: 'poll', 
                author: 'bob_johnson', 
                content: 'Bạn thích framework JavaScript nào nhất?', 
                extra: 'React,Vue,Angular,Svelte', 
                timestamp: new Date('2024-03-19T09:15:00').toLocaleString('vi-VN'),
                isDeleted: false, 
                isVerified: false, 
                verifiedBy: '',
                likes: 8,
                shares: 2,
                pollVotes: { React: 12, Vue: 8, Angular: 5, Svelte: 3 }
            }
        ];

        // Load comments
        this.comments = [
            { 
                id: 1, 
                postId: 1, 
                author: 'jane_doe', 
                content: 'Chào bạn! Rất vui được làm quen!', 
                timestamp: new Date('2024-03-20T10:35:00').toLocaleString('vi-VN'),
                isDeleted: false,
                likes: 2
            },
            { 
                id: 2, 
                postId: 1, 
                author: 'alice_smith', 
                content: 'Chào mừng bạn đến với SocialHub!', 
                timestamp: new Date('2024-03-20T11:20:00').toLocaleString('vi-VN'),
                isDeleted: false,
                likes: 1
            },
            { 
                id: 3, 
                postId: 2, 
                author: 'john_doe', 
                content: 'Cảnh đẹp quá! Bạn chụp ở đâu vậy?', 
                timestamp: new Date('2024-03-20T15:30:00').toLocaleString('vi-VN'),
                isDeleted: false,
                likes: 3
            }
        ];

        // Load messages
        this.messages = [
            { 
                id: 1, 
                sender: 'john_doe', 
                receiver: 'jane_doe', 
                content: 'Chào Jane! Bạn có khỏe không?', 
                timestamp: new Date('2024-03-20T09:00:00').toLocaleString('vi-VN'),
                read: true
            },
            { 
                id: 2, 
                sender: 'jane_doe', 
                receiver: 'john_doe', 
                content: 'Chào John! Mình khỏe, cảm ơn bạn. Còn bạn thì sao?', 
                timestamp: new Date('2024-03-20T09:05:00').toLocaleString('vi-VN'),
                read: true
            },
            { 
                id: 3, 
                sender: 'john_doe', 
                receiver: 'jane_doe', 
                content: 'Mình cũng khỏe. Cuối tuần này bạn có kế hoạch gì không?', 
                timestamp: new Date('2024-03-20T09:10:00').toLocaleString('vi-VN'),
                read: false
            }
        ];

        // Initialize friend state
        this.friendState = {
            'admin1': { friends: ['moderator1'], requests: [], sent: [] },
            'moderator1': { friends: ['admin1'], requests: [], sent: [] },
            'john_doe': { friends: ['jane_doe'], requests: ['alice_smith'], sent: ['bob_johnson'] },
            'jane_doe': { friends: ['john_doe'], requests: [], sent: [] },
            'alice_smith': { friends: [], requests: [], sent: ['john_doe'] },
            'bob_johnson': { friends: [], requests: ['john_doe'], sent: [] }
        };

        // Set active user
        this.activeUser = this.users[2]; // john_doe
    }

    // ===== THEME MANAGEMENT =====
    setupTheme() {
        const savedTheme = localStorage.getItem('socialhub-theme');
        if (savedTheme) {
            this.theme = savedTheme;
        }
        this.applyTheme();
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('socialhub-theme', this.theme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        
        this.showNotification(`Đã chuyển sang chế độ ${this.theme === 'dark' ? 'tối' : 'sáng'}`, 'success');
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    // ===== LOADING SCREEN =====
    showLoadingScreen() {
        document.getElementById('loadingScreen').classList.remove('hidden');
    }

    hideLoadingScreen() {
        document.getElementById('loadingScreen').classList.add('hidden');
    }

    // ===== NOTIFICATION SYSTEM =====
    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="btn-icon" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // ===== NAVIGATION =====
    handleNavigation(event) {
        event.preventDefault();
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        event.currentTarget.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = event.currentTarget.getAttribute('data-section');
        document.getElementById(targetSection).classList.add('active');
        
        // Update stats
        this.updateStats();
    }

    // ===== USER MANAGEMENT =====
    renderActiveUserSelect() {
        const select = document.getElementById('activeUserSelect');
        select.innerHTML = '<option value="">Chọn người dùng...</option>';
        
        this.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.username;
            option.textContent = `${user.username} (${user.role})`;
            option.selected = user.username === this.activeUser.username;
            select.appendChild(option);
        });
        
        select.addEventListener('change', (e) => {
            const username = e.target.value;
            if (username) {
                this.switchActiveUser(username);
            }
        });
    }

    switchActiveUser(username) {
        const user = this.users.find(u => u.username === username);
        if (user) {
            this.activeUser = user;
            this.updateUserDisplay();
            this.renderAll();
            this.showNotification(`Đã chuyển sang người dùng: ${user.username}`, 'success');
        }
    }

    updateUserDisplay() {
        document.getElementById('currentUsername').textContent = this.activeUser.username;
        document.getElementById('currentUserRole').textContent = this.getRoleDisplayName(this.activeUser.role);
    }

    getRoleDisplayName(role) {
        const roleNames = {
            'Admin': 'Quản trị viên',
            'Moderator': 'Điều hành viên',
            'User': 'Người dùng'
        };
        return roleNames[role] || role;
    }

    renderUsers() {
        const userList = document.getElementById('userList');
        const searchTerm = document.getElementById('userSearch').value.toLowerCase();
        
        const filteredUsers = this.users.filter(user => 
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm)
        );

        userList.innerHTML = filteredUsers.map(user => `
            <div class="user-card ${user.role.toLowerCase()}">
                <div class="user-card-header">
                    <div class="user-card-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-card-info">
                        <h4>${user.username}</h4>
                        <div class="user-card-role">
                            ${this.getRoleDisplayName(user.role)}
                            ${user.isOnline ? '<span class="online-dot"></span>' : ''}
                        </div>
                    </div>
                </div>
                
                <div class="user-card-stats">
                    <div class="stat">
                        <span class="stat-value">${this.getUserPostCount(user.username)}</span>
                        <span class="stat-label">Bài viết</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${this.getUserFriendCount(user.username)}</span>
                        <span class="stat-label">Bạn bè</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${this.getUserCommentCount(user.username)}</span>
                        <span class="stat-label">Bình luận</span>
                    </div>
                </div>
                
                <div class="user-card-actions">
                    ${user.username !== this.activeUser.username ? `
                        <button class="btn-secondary" onclick="socialHub.sendFriendRequest('${user.username}')">
                            <i class="fas fa-user-plus"></i> Kết bạn
                        </button>
                    ` : ''}
                    
                    ${(this.activeUser.role === 'Admin' || this.activeUser.role === 'Moderator') && user.username !== this.activeUser.username ? `
                        <button class="btn-icon" onclick="socialHub.messageUser('${user.username}')" title="Nhắn tin">
                            <i class="fas fa-comment"></i>
                        </button>
                    ` : ''}
                    
                    ${this.activeUser.role === 'Admin' && user.username !== this.activeUser.username ? `
                        <button class="btn-icon" onclick="socialHub.deleteUser('${user.username}')" title="Xóa người dùng">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    filterUsers() {
        this.renderUsers();
    }

    getUserPostCount(username) {
        return this.posts.filter(post => post.author === username && !post.isDeleted).length;
    }

    getUserFriendCount(username) {
        return this.friendState[username] ? this.friendState[username].friends.length : 0;
    }

    getUserCommentCount(username) {
        return this.comments.filter(comment => comment.author === username && !comment.isDeleted).length;
    }

    // ===== USER MODAL =====
    showUserModal() {
        if (this.activeUser.role !== 'Admin') {
            this.showNotification('Chỉ quản trị viên mới có thể thêm người dùng mới', 'error');
            return;
        }
        
        document.getElementById('userModal').classList.add('active');
        document.getElementById('userForm').reset();
    }

    hideUserModal() {
        document.getElementById('userModal').classList.remove('active');
    }

    saveNewUser() {
        const username = document.getElementById('newUsername').value.trim();
        const email = document.getElementById('newEmail').value.trim();
        const role = document.getElementById('newUserRole').value;

        if (!username || !email) {
            this.showNotification('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        if (this.users.find(u => u.username === username)) {
            this.showNotification('Tên người dùng đã tồn tại', 'error');
            return;
        }

        const newUser = {
            id: this.users.length + 1,
            username,
            role,
            email,
            joinDate: new Date().toISOString().split('T')[0],
            isOnline: true
        };

        this.users.push(newUser);
        this.friendState[username] = { friends: [], requests: [], sent: [] };
        
        this.hideUserModal();
        this.renderAll();
        this.showNotification(`Đã thêm người dùng: ${username}`, 'success');
    }

    deleteUser(username) {
        if (!confirm(`Bạn có chắc muốn xóa người dùng ${username}?`)) {
            return;
        }

        this.users = this.users.filter(u => u.username !== username);
        delete this.friendState[username];
        
        // Remove user's posts and comments
        this.posts = this.posts.filter(post => post.author !== username);
        this.comments = this.comments.filter(comment => comment.author !== username);
        
        // Remove from friend lists
        Object.keys(this.friendState).forEach(user => {
            this.friendState[user].friends = this.friendState[user].friends.filter(friend => friend !== username);
            this.friendState[user].requests = this.friendState[user].requests.filter(req => req !== username);
            this.friendState[user].sent = this.friendState[user].sent.filter(sent => sent !== username);
        });

        this.renderAll();
        this.showNotification(`Đã xóa người dùng: ${username}`, 'success');
    }

    // ===== POST MANAGEMENT =====
    updatePostExtraFields() {
        const postType = document.getElementById('postType').value;
        const extraFields = document.getElementById('postExtraFields');
        
        switch (postType) {
            case 'image':
                extraFields.innerHTML = `
                    <label>URL hình ảnh:</label>
                    <input type="url" class="form-input" placeholder="https://example.com/image.jpg">
                    <small>Nhập URL hình ảnh hợp lệ</small>
                `;
                break;
            case 'video':
                extraFields.innerHTML = `
                    <label>URL video:</label>
                    <input type="url" class="form-input" placeholder="https://example.com/video.mp4">
                    <label>Thời lượng (giây):</label>
                    <input type="number" class="form-input" placeholder="120" min="1">
                `;
                break;
            case 'poll':
                extraFields.innerHTML = `
                    <label>Tùy chọn bình chọn (phân cách bằng dấu phẩy):</label>
                    <input type="text" class="form-input" placeholder="Lựa chọn 1, Lựa chọn 2, Lựa chọn 3">
                    <small>Nhập ít nhất 2 tùy chọn, phân cách bằng dấu phẩy</small>
                `;
                break;
            default:
                extraFields.innerHTML = `
                    <label>Định dạng văn bản:</label>
                    <select class="form-select">
                        <option value="plain_text">Văn bản thuần</option>
                        <option value="markdown">Markdown</option>
                        <option value="html">HTML</option>
                    </select>
                `;
        }
    }

    updateCharCount() {
        const content = document.getElementById('postContent').value;
        const counter = document.getElementById('charCount');
        counter.textContent = content.length;
        
        if (content.length > 500) {
            counter.style.color = '#f5576c';
        } else if (content.length > 400) {
            counter.style.color = '#fee140';
        } else {
            counter.style.color = 'var(--text-muted)';
        }
    }

    createPost() {
        const type = document.getElementById('postType').value;
        const content = document.getElementById('postContent').value.trim();
        
        if (!content) {
            this.showNotification('Vui lòng nhập nội dung bài viết', 'error');
            return;
        }

        if (content.length > 500) {
            this.showNotification('Nội dung bài viết không được vượt quá 500 ký tự', 'error');
            return;
        }

        const extraInput = document.querySelector('#postExtraFields input, #postExtraFields select');
        const extra = extraInput ? extraInput.value : '';

        const newPost = {
            id: this.posts.length + 1,
            type,
            author: this.activeUser.username,
            content,
            extra,
            timestamp: new Date().toLocaleString('vi-VN'),
            isDeleted: false,
            isVerified: false,
            verifiedBy: '',
            likes: 0,
            shares: 0
        };

        if (type === 'video') {
            const durationInput = document.querySelector('#postExtraFields input[type="number"]');
            newPost.duration = durationInput ? parseInt(durationInput.value) || 0 : 0;
        }

        if (type === 'poll') {
            newPost.pollVotes = {};
            extra.split(',').forEach(option => {
                newPost.pollVotes[option.trim()] = 0;
            });
        }

        this.posts.unshift(newPost);
        
        // Clear form
        document.getElementById('postContent').value = '';
        document.getElementById('charCount').textContent = '0';
        
        this.renderPosts();
        this.showNotification('Đã đăng bài viết thành công!', 'success');
    }

    renderPosts() {
        const postList = document.getElementById('postList');
        const filter = document.getElementById('postFilter').value;
        
        let filteredPosts = this.posts.filter(post => !post.isDeleted);

        // Apply filters
        switch (filter) {
            case 'verified':
                filteredPosts = filteredPosts.filter(post => post.isVerified);
                break;
            case 'myPosts':
                filteredPosts = filteredPosts.filter(post => post.author === this.activeUser.username);
                break;
            case 'friends':
                const friends = this.friendState[this.activeUser.username]?.friends || [];
                filteredPosts = filteredPosts.filter(post => 
                    friends.includes(post.author) || post.author === this.activeUser.username
                );
                break;
        }

        // Pagination
        const startIndex = 0;
        const endIndex = this.currentPage * this.postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);

        postList.innerHTML = postsToShow.map(post => this.renderPost(post)).join('');

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMorePosts');
        if (endIndex >= filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        this.updateStats();
    }

    renderPost(post) {
        const postComments = this.comments.filter(comment => 
            comment.postId === post.id && !comment.isDeleted
        );

        return `
            <div class="post-card ${post.isVerified ? 'verified' : ''}">
                <div class="post-header">
                    <div class="post-author">
                        <div class="post-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="post-author-info">
                            <h4>${post.author}</h4>
                            <div class="post-meta">
                                ${post.timestamp}
                                ${post.isVerified ? `
                                    <span class="verified-badge">
                                        <i class="fas fa-check"></i> Đã xác thực bởi ${post.verifiedBy}
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="post-actions-menu">
                        ${this.canModifyPost(post) ? `
                            <button class="btn-icon" onclick="socialHub.deletePost(${post.id})" title="Xóa bài viết">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                        ${this.canVerifyPost() && !post.isVerified ? `
                            <button class="btn-icon" onclick="socialHub.verifyPost(${post.id})" title="Xác thực bài viết">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        ${post.isVerified && this.canVerifyPost() ? `
                            <button class="btn-icon" onclick="socialHub.unverifyPost(${post.id})" title="Bỏ xác thực">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>

                <div class="post-content">
                    <p>${this.escapeHtml(post.content)}</p>
                    ${this.renderPostMedia(post)}
                </div>

                <div class="post-actions-bar">
                    <button class="post-action" onclick="socialHub.likePost(${post.id})">
                        <i class="fas fa-heart"></i> ${post.likes}
                    </button>
                    <button class="post-action" onclick="socialHub.toggleComments(${post.id})">
                        <i class="fas fa-comment"></i> ${postComments.length}
                    </button>
                    <button class="post-action" onclick="socialHub.sharePost(${post.id})">
                        <i class="fas fa-share"></i> ${post.shares}
                    </button>
                </div>

                <div class="comments-section" id="comments-${post.id}" style="display: none;">
                    ${postComments.map(comment => this.renderComment(comment)).join('')}
                    <div class="add-comment">
                        <input type="text" placeholder="Viết bình luận..." 
                               onkeypress="if(event.key==='Enter') socialHub.addComment(${post.id}, this.value); this.value='';">
                        <button class="btn-primary" onclick="socialHub.addComment(${post.id}, this.previousElementSibling.value); this.previousElementSibling.value='';">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderPostMedia(post) {
        switch (post.type) {
            case 'image':
                return `<img src="${post.extra}" alt="Post image" class="post-image" onerror="this.style.display='none'">`;
            case 'video':
                return `
                    <div class="post-video-container">
                        <video controls class="post-video">
                            <source src="${post.extra}" type="video/mp4">
                            Trình duyệt của bạn không hỗ trợ video.
                        </video>
                        <div class="video-duration">${this.formatDuration(post.duration)}</div>
                    </div>
                `;
            case 'poll':
                return this.renderPoll(post);
            default:
                return `<div class="post-format">Định dạng: ${post.extra}</div>`;
        }
    }

    renderPoll(post) {
        const totalVotes = Object.values(post.pollVotes).reduce((a, b) => a + b, 0);
        
        return `
            <div class="poll-container">
                <div class="poll-options">
                    ${Object.entries(post.pollVotes).map(([option, votes]) => {
                        const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                        return `
                            <div class="poll-option">
                                <button class="poll-vote-btn" onclick="socialHub.voteInPoll(${post.id}, '${option}')">
                                    ${option}
                                </button>
                                <div class="poll-results">
                                    <div class="poll-bar">
                                        <div class="poll-fill" style="width: ${percentage}%"></div>
                                    </div>
                                    <span class="poll-stats">${votes} phiếu (${percentage.toFixed(1)}%)</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="poll-total">Tổng số phiếu: ${totalVotes}</div>
            </div>
        `;
    }

    renderComment(comment) {
        return `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${comment.timestamp}</span>
                </div>
                <div class="comment-content">${this.escapeHtml(comment.content)}</div>
                <div class="comment-actions">
                    <button class="post-action" onclick="socialHub.likeComment(${comment.id})">
                        <i class="fas fa-heart"></i> ${comment.likes || 0}
                    </button>
                    ${this.canModifyComment(comment) ? `
                        <button class="post-action" onclick="socialHub.deleteComment(${comment.id})">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // ===== POST INTERACTIONS =====
    likePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            this.renderPosts();
            this.showNotification('Đã thích bài viết!', 'success');
        }
    }

    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.shares++;
            this.showNotification('Đã chia sẻ bài viết!', 'success');
            
            // Simulate sharing to friends
            const friends = this.friendState[this.activeUser.username]?.friends || [];
            friends.forEach(friend => {
                this.showNotification(`Đã chia sẻ bài viết với ${friend}`, 'info');
            });
        }
    }

    toggleComments(postId) {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection) {
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
        }
    }

    addComment(postId, content) {
        if (!content.trim()) {
            this.showNotification('Vui lòng nhập nội dung bình luận', 'error');
            return;
        }

        const newComment = {
            id: this.comments.length + 1,
            postId,
            author: this.activeUser.username,
            content: content.trim(),
            timestamp: new Date().toLocaleString('vi-VN'),
            isDeleted: false,
            likes: 0
        };

        this.comments.push(newComment);
        this.renderPosts();
        this.showNotification('Đã thêm bình luận!', 'success');
    }

    likeComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.likes = (comment.likes || 0) + 1;
            this.renderPosts();
        }
    }

    voteInPoll(postId, option) {
        const post = this.posts.find(p => p.id === postId);
        if (post && post.type === 'poll' && post.pollVotes[option] !== undefined) {
            post.pollVotes[option]++;
            this.renderPosts();
            this.showNotification(`Đã bình chọn cho: ${option}`, 'success');
        }
    }

    // ===== POST MODERATION =====
    canModifyPost(post) {
        return this.activeUser.username === post.author || 
               this.activeUser.role === 'Admin' || 
               this.activeUser.role === 'Moderator';
    }

    canVerifyPost() {
        return this.activeUser.role === 'Admin' || this.activeUser.role === 'Moderator';
    }

    canModifyComment(comment) {
        return this.activeUser.username === comment.author || 
               this.activeUser.role === 'Admin' || 
               this.activeUser.role === 'Moderator';
    }

    deletePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post && this.canModifyPost(post)) {
            post.isDeleted = true;
            this.renderPosts();
            this.showNotification('Đã xóa bài viết', 'success');
        } else {
            this.showNotification('Bạn không có quyền xóa bài viết này', 'error');
        }
    }

    verifyPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post && this.canVerifyPost()) {
            post.isVerified = true;
            post.verifiedBy = this.activeUser.username;
            this.renderPosts();
            this.showNotification('Đã xác thực bài viết', 'success');
        }
    }

    unverifyPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post && this.canVerifyPost()) {
            post.isVerified = false;
            post.verifiedBy = '';
            this.renderPosts();
            this.showNotification('Đã bỏ xác thực bài viết', 'success');
        }
    }

    deleteComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment && this.canModifyComment(comment)) {
            comment.isDeleted = true;
            this.renderPosts();
            this.showNotification('Đã xóa bình luận', 'success');
        } else {
            this.showNotification('Bạn không có quyền xóa bình luận này', 'error');
        }
    }

    // ===== FRIENDS SYSTEM =====
    switchFriendsTab(event) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        const targetTab = event.currentTarget.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
        
        // Show target tab pane
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
        
        // Render appropriate content
        switch (targetTab) {
            case 'friends-list':
                this.renderFriendsList();
                break;
            case 'friend-requests':
                this.renderFriendRequests();
                break;
            case 'suggestions':
                this.renderFriendSuggestions();
                break;
        }
    }

    renderFriendsList() {
        const friendList = document.getElementById('friendList');
        const friends = this.friendState[this.activeUser.username]?.friends || [];
        
        if (friends.length === 0) {
            friendList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-friends"></i>
                    <p>Bạn chưa có bạn bè nào</p>
                    <button class="btn-primary" onclick="document.querySelector('[data-tab=\\'suggestions\\']').click()">
                        <i class="fas fa-user-plus"></i> Tìm bạn bè
                    </button>
                </div>
            `;
            return;
        }

        friendList.innerHTML = friends.map(friend => {
            const user = this.users.find(u => u.username === friend);
            return user ? `
                <div class="friend-card">
                    <div class="friend-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <h4>${user.username}</h4>
                    <p class="friend-role">${this.getRoleDisplayName(user.role)}</p>
                    <div class="friend-actions">
                        <button class="btn-secondary" onclick="socialHub.messageUser('${user.username}')">
                            <i class="fas fa-comment"></i> Nhắn tin
                        </button>
                        <button class="btn-icon" onclick="socialHub.removeFriend('${user.username}')" title="Xóa bạn">
                            <i class="fas fa-user-times"></i>
                        </button>
                    </div>
                </div>
            ` : '';
        }).join('');
    }

    renderFriendRequests() {
        const requestsContainer = document.getElementById('friendRequests');
        const requests = this.friendState[this.activeUser.username]?.requests || [];
        
        if (requests.length === 0) {
            requestsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope"></i>
                    <p>Không có lời mời kết bạn nào</p>
                </div>
            `;
            return;
        }

        requestsContainer.innerHTML = requests.map(request => {
            const user = this.users.find(u => u.username === request);
            return user ? `
                <div class="request-item">
                    <div class="request-info">
                        <div class="user-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <h4>${user.username}</h4>
                            <p>${this.getRoleDisplayName(user.role)}</p>
                        </div>
                    </div>
                    <div class="request-actions">
                        <button class="btn-primary" onclick="socialHub.acceptFriendRequest('${user.username}')">
                            <i class="fas fa-check"></i> Chấp nhận
                        </button>
                        <button class="btn-secondary" onclick="socialHub.declineFriendRequest('${user.username}')">
                            <i class="fas fa-times"></i> Từ chối
                        </button>
                    </div>
                </div>
            ` : '';
        }).join('');
    }

    renderFriendSuggestions() {
        const suggestionsContainer = document.getElementById('friendSuggestions');
        const currentFriends = this.friendState[this.activeUser.username]?.friends || [];
        const currentRequests = this.friendState[this.activeUser.username]?.requests || [];
        const currentSent = this.friendState[this.activeUser.username]?.sent || [];
        
        const suggestions = this.users.filter(user => 
            user.username !== this.activeUser.username &&
            !currentFriends.includes(user.username) &&
            !currentRequests.includes(user.username) &&
            !currentSent.includes(user.username)
        );

        if (suggestions.length === 0) {
            suggestionsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>Không có gợi ý kết bạn nào</p>
                </div>
            `;
            return;
        }

        suggestionsContainer.innerHTML = suggestions.map(user => `
            <div class="suggestion-card">
                <div class="suggestion-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <h4>${user.username}</h4>
                <p class="suggestion-role">${this.getRoleDisplayName(user.role)}</p>
                <p class="suggestion-mutual">${this.getMutualFriendsCount(user.username)} bạn chung</p>
                <button class="btn-primary" onclick="socialHub.sendFriendRequest('${user.username}')">
                    <i class="fas fa-user-plus"></i> Kết bạn
                </button>
            </div>
        `).join('');
    }

    getMutualFriendsCount(username) {
        const userFriends = this.friendState[username]?.friends || [];
        const myFriends = this.friendState[this.activeUser.username]?.friends || [];
        return userFriends.filter(friend => myFriends.includes(friend)).length;
    }

    sendFriendRequest(targetUsername) {
        if (targetUsername === this.activeUser.username) {
            this.showNotification('Không thể gửi lời mời kết bạn cho chính mình', 'error');
            return;
        }

        const targetState = this.friendState[targetUsername];
        if (!targetState) {
            this.showNotification('Người dùng không tồn tại', 'error');
            return;
        }

        if (targetState.friends.includes(this.activeUser.username)) {
            this.showNotification('Đã là bạn bè với người dùng này', 'info');
            return;
        }

        if (targetState.requests.includes(this.activeUser.username)) {
            this.showNotification('Đã gửi lời mời kết bạn trước đó', 'info');
            return;
        }

        // Add to target's requests and our sent list
        targetState.requests.push(this.activeUser.username);
        this.friendState[this.activeUser.username].sent.push(targetUsername);

        this.showNotification(`Đã gửi lời mời kết bạn đến ${targetUsername}`, 'success');
        this.renderFriends();
    }

    acceptFriendRequest(fromUsername) {
        const myState = this.friendState[this.activeUser.username];
        const fromState = this.friendState[fromUsername];

        // Remove from requests
        myState.requests = myState.requests.filter(req => req !== fromUsername);
        
        // Add to friends lists
        if (!myState.friends.includes(fromUsername)) {
            myState.friends.push(fromUsername);
        }
        if (!fromState.friends.includes(this.activeUser.username)) {
            fromState.friends.push(this.activeUser.username);
        }

        // Remove from sent list
        fromState.sent = fromState.sent.filter(sent => sent !== this.activeUser.username);

        this.showNotification(`Đã chấp nhận lời mời kết bạn từ ${fromUsername}`, 'success');
        this.renderFriends();
    }

    declineFriendRequest(fromUsername) {
        const myState = this.friendState[this.activeUser.username];
        const fromState = this.friendState[fromUsername];

        // Remove from requests and sent lists
        myState.requests = myState.requests.filter(req => req !== fromUsername);
        fromState.sent = fromState.sent.filter(sent => sent !== this.activeUser.username);

        this.showNotification(`Đã từ chối lời mời kết bạn từ ${fromUsername}`, 'info');
        this.renderFriends();
    }

    removeFriend(username) {
        if (!confirm(`Bạn có chắc muốn xóa ${username} khỏi danh sách bạn bè?`)) {
            return;
        }

        const myState = this.friendState[this.activeUser.username];
        const friendState = this.friendState[username];

        // Remove from both friends lists
        myState.friends = myState.friends.filter(friend => friend !== username);
        friendState.friends = friendState.friends.filter(friend => friend !== this.activeUser.username);

        this.showNotification(`Đã xóa ${username} khỏi danh sách bạn bè`, 'success');
        this.renderFriends();
    }

    // ===== MESSAGES SYSTEM =====
    startNewMessage() {
        // For demo purposes, start a conversation with the first available user
        const availableUsers = this.users.filter(user => 
            user.username !== this.activeUser.username
        );

        if (availableUsers.length > 0) {
            this.selectConversation(availableUsers[0].username);
        }
    }

    selectConversation(username) {
        const user = this.users.find(u => u.username === username);
        if (!user) return;

        // Update conversation header
        const conversationHeader = document.querySelector('.conversation-info');
        conversationHeader.innerHTML = `
            <div class="conversation-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="conversation-details">
                <span class="conversation-name">${user.username}</span>
                <span class="conversation-status">${user.isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}</span>
            </div>
        `;

        // Enable message input
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendMessageBtn');
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageInput.placeholder = `Nhắn tin cho ${user.username}...`;
        messageInput.focus();

        // Store current conversation
        this.currentConversation = username;

        // Render messages
        this.renderMessages(username);
    }

    renderMessages(username) {
        const messageThread = document.getElementById('messageThread');
        const conversationMessages = this.messages.filter(msg => 
            (msg.sender === this.activeUser.username && msg.receiver === username) ||
            (msg.sender === username && msg.receiver === this.activeUser.username)
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        if (conversationMessages.length === 0) {
            messageThread.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-comments"></i>
                    <p>Chưa có tin nhắn nào</p>
                    <p class="text-muted">Bắt đầu cuộc trò chuyện với ${username}</p>
                </div>
            `;
            return;
        }

        messageThread.innerHTML = conversationMessages.map(msg => `
            <div class="message ${msg.sender === this.activeUser.username ? 'sent' : 'received'}">
                <div class="message-content">${this.escapeHtml(msg.content)}</div>
                <div class="message-time">${msg.timestamp}</div>
            </div>
        `).join('');

        // Scroll to bottom
        messageThread.scrollTop = messageThread.scrollHeight;
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const content = messageInput.value.trim();

        if (!content || !this.currentConversation) {
            return;
        }

        const newMessage = {
            id: this.messages.length + 1,
            sender: this.activeUser.username,
            receiver: this.currentConversation,
            content,
            timestamp: new Date().toLocaleString('vi-VN'),
            read: false
        };

        this.messages.push(newMessage);
        messageInput.value = '';

        // Re-render messages
        this.renderMessages(this.currentConversation);
        this.showNotification('Đã gửi tin nhắn', 'success');
    }

    messageUser(username) {
        this.selectConversation(username);
        // Switch to messages section
        document.querySelector('[data-section="messages"]').click();
    }

    // ===== UTILITY FUNCTIONS =====
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    refreshData() {
        this.showLoadingScreen();
        setTimeout(() => {
            this.renderAll();
            this.hideLoadingScreen();
            this.showNotification('Đã làm mới dữ liệu', 'success');
        }, 1000);
    }

    togglePostSort() {
        this.posts.reverse();
        this.renderPosts();
        this.showNotification('Đã đảo ngược thứ tự bài viết', 'info');
    }

    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
    }

    updateStats() {
        // Update sidebar stats
        document.getElementById('totalUsers').textContent = this.users.length;
        document.getElementById('totalPosts').textContent = this.posts.filter(p => !p.isDeleted).length;
        document.getElementById('onlineUsers').textContent = this.users.filter(u => u.isOnline).length;

        // Update navigation badges
        document.getElementById('postCount').textContent = this.posts.filter(p => !p.isDeleted).length;
        document.getElementById('friendRequestCount').textContent = this.friendState[this.activeUser.username]?.requests.length || 0;
        
        const unreadMessages = this.messages.filter(msg => 
            msg.receiver === this.activeUser.username && !msg.read
        ).length;
        document.getElementById('messageCount').textContent = unreadMessages;
    }

    renderAll() {
        this.renderActiveUserSelect();
        this.updateUserDisplay();
        this.renderUsers();
        this.renderPosts();
        this.renderFriendsList();
        this.updateStats();
    }
}

// ===== INITIALIZATION =====
let socialHub;

document.addEventListener('DOMContentLoaded', () => {
    socialHub = new SocialHub();
});

// Global helper function for HTML event handlers
function $(id) {
    return document.getElementById(id);
}