import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Viewpage.css';

const ViewBlog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  
  // Initial blog posts data
  const initialPosts = [
    {
      id: 1,
      title: "Say What You Really Think — Anonymously",
      excerpt: "Kalesh is changing social media by putting opinions first and identities last. Learn how anonymous polls and chats actually work.",
      date: "February 10, 2026",
      readTime: "2 min read",
      category: "ANONYMITY",
      categoryColor: "linear-gradient(135deg, #ff6a00, #ffd700)",
      icon: "fas fa-microphone-alt",
      image: "/blog-post1.webp",
      trending: true,
      slug: "Post1"
    },
    {
      id: 2,
      title: "What Makes Live Polls So Powerful?",
      excerpt: "Real-time voting, instant results, and anonymous participation make live polls the fastest way to capture real opinions.",
      date: "February 10, 2026",
      readTime: "3 min read",
      category: "LIVE-POLLS",
      categoryColor: "linear-gradient(135deg, #ff8c00, #ffd700)",
      icon: "fas fa-photo-video",
      image: "/blog-post2.webp",
      trending: true,
      slug: "Post2"
    },
    {
      id: 3,
      title: "Anonymous vs Public Comments: Which Is Safer?",
      excerpt: "Public comments expose identity and invite judgment. Anonymous comments on Kalesh protect users, reduce harassment, and keep conversations focused on opinions—not people.",
      date: "February 10, 2026",
      readTime: "5 min read",
      category: "SECURITY",
      categoryColor: "linear-gradient(135deg, #ff2a2a, #ff6a00)",
      icon: "fas fa-shield-alt",
      image: "/blog-post3.webp",
      trending: true,
      slug: "Post3"
    },
    {
      id: 4,
      title: "How Anonymous Platforms Protect User Privacy",
      excerpt: "Discover how anonymous platforms safeguard identities, reduce harassment, and create judgment-free spaces where opinions matter more than personal data.",
      date: "February 10, 2026",
      readTime: "3 min read",
      category: "PRIVACY",
      categoryColor: "linear-gradient(135deg, #ff6a00, #ffd700)",
      icon: "fas fa-moon",
      image: "/blog-post4.webp",
      trending: false,
      slug: "Post4"
    },
    {
      id: 5,
      title: "Top Benefits of Using Anonymous Opinion Platforms",
      excerpt: "Anonymous opinion platforms enable honest expression, reduce social pressure, and provide real-time feedback—without exposing personal identity.",
      date: "February 10, 2026",
      readTime: "4 min read",
      category: "BENEFITS",
      categoryColor: "linear-gradient(135deg, #ff8c00, #ffd700)",
      icon: "fas fa-users",
      image: "/blog-post5.webp",
      trending: false,
      slug: "Post5"
    },
  ];

  // State variables
  const [posts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const postsPerPage = 9;
  const searchInputRef = useRef(null);

  // Categories for filtering
  const categories = [
    { name: 'ALL', count: initialPosts.length, icon: 'fas fa-layer-group' },
    { name: 'FEATURES', count: initialPosts.filter(post => post.category === 'FEATURES').length, icon: 'fas fa-star' },
    { name: 'UPDATE', count: initialPosts.filter(post => post.category === 'UPDATE').length, icon: 'fas fa-sync-alt' },
    { name: 'SECURITY', count: initialPosts.filter(post => post.category === 'SECURITY').length, icon: 'fas fa-shield-alt' }
  ];

  // Handle search and filtering
  useEffect(() => {
    let filtered = [...initialPosts];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Focus search input on Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Handle share functionality
  const handleShare = (post) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Post link copied to clipboard!');
    });
  };

  return (
    <>
      <Helmet>
        <title>All Blog Posts – Kalesh Blog</title>
        <meta name="description" content="Explore all blog posts from Kalesh. Learn about anonymous social media, live polls, privacy, and more from India's first anonymous opinion platform." />
        <link rel="canonical" href="https://thekalesh.com/blog/viewpage" />
      </Helmet>
      <div className="view-blog">
      {/* Back to Blog Button */}
      <div className="back-to-blog">
        <div className="back-container">
          <Link to="/blog" className="back-button">
            <i className="fas fa-arrow-left"></i> Back to Blog
          </Link>
        </div>
      </div>

      {/* Header Section */}
      <header className="view-header">
        <div className="container-fluid">
          <div className="header-background"></div>
          <div className="header-content">
            <div className="header-left">
              <h1 className="blog-main-title">
                <span className="gradient-title">All Blog Posts</span>
              </h1>
              <p className="blog-subtitle">
                Discover honest insights, product updates, and deep dives into anonymous expression. Explore how Kalesh is reshaping opinions without identity pressure.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="header-right">
              <div className="search-box">
                <div className="search-header">
                  <h4><i className="fas fa-search"></i> Advanced Search</h4>
                  <div className="search-shortcut">
                    <kbd>Ctrl</kbd> + <kbd>K</kbd>
                  </div>
                </div>
                <div className="search-container">
                  <i className="fas fa-search"></i>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search posts, categories, or keywords..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button 
                      className="clear-search" 
                      onClick={() => setSearchTerm('')}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
                <div className="search-options">
                  <div className="sort-options">
                    <label htmlFor="sortBy">
                      <i className="fas fa-sort-amount-down"></i> Sort by:
                    </label>
                    <select 
                      id="sortBy" 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                  <div className="search-info">
                    <i className="fas fa-info-circle"></i>
                    {filteredPosts.length} results found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <section className="category-filter-section">
        <div className="container-fluid">
          <div className="section-label">
            <i className="fas fa-filter"></i>
            <span>Filter by Category</span>
          </div>
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`filter-tab ${selectedCategory === cat.name ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(cat.name)}
              >
                <i className={cat.icon}></i>
                <span className="tab-text">{cat.name}</span>
                <span className="tab-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="all-posts-section">
        <div className="container-fluid">
          <div className="all-posts-container grid-view">
            {currentPosts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-card-inner">
                  {/* Trending Badge */}
                  {post.trending && (
                    <div className="trending-badge">
                      <i className="fas fa-fire"></i> Trending
                    </div>
                  )}
                  
                  {/* Post Image */}
                  <div className="post-image">
                    <div className="image-overlay"></div>
                    <img src={post.image} alt={post.title} />
                    <div className="post-category">
                      
                      <span 
                        className="category-name"
                        style={{background: post.categoryColor}}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <div className="post-content">
                    <div className="post-header">
                      <div className="blog-meta">
                        <span className="blog-date">
                          <i className="far fa-calendar"></i> {post.date}
                        </span>
                        <span className="blog-readtime">
                          <i className="far fa-clock"></i> {post.readTime}
                        </span>
                      </div>
                      <h3 className="blog-title">{post.title}</h3>
                    </div>
                    
                    <p className="blog-excerpt">{post.excerpt}</p>
                    
                    <div className="post-footer">
                      {/* Read Article Link */}
                      <Link to={`/blog/${post.slug}`} className="read-link-btn">
                        <span>Read Article</span>
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                      <div className="post-actions">
                        <button className="action-btn" title="Save for later">
                          <i className="far fa-bookmark"></i>
                        </button>
                        <button 
                          className="action-btn" 
                          title="Share" 
                          onClick={() => handleShare(post)}
                        >
                          <i className="fas fa-share"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* No Results Message */}
          {currentPosts.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>No posts found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
              <div className="no-results-actions">
                <button 
                  className="btn-kalesh"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('ALL');
                    setSortBy('newest');
                  }}
                >
                  <i className="fas fa-redo"></i> Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredPosts.length > 0 && totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-btn pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
                <span>Previous</span>
              </button>
              
              <div className="page-numbers">
                {getPageNumbers().map((number, index) => (
                  number === '...' ? (
                    <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                  ) : (
                    <button
                      key={number}
                      className={`page-number ${currentPage === number ? 'active' : ''}`}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </button>
                  )
                ))}
              </div>
              
              <div className="page-info">
                Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length}
              </div>
              
              <button 
                className="pagination-btn pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default ViewBlog;