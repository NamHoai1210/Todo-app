import React, {memo} from 'react';

const Navbar = memo((props) => {
  const {status, setStatus} = props;
  const filterBtn =[
    {
      title: 'All',
      isActive: status==='all',
      onclick: ()=>{
        setStatus('all');
      },
      link: '',
    },
    {
      title: 'Active',
      isActive: status==='active',
      onclick: ()=>{
        setStatus('active');
      },
      link: 'active',
    },
    {
      title: 'Completed',
      isActive: status==='completed',
      onclick: ()=>{
        setStatus('completed');
      },
      link: 'completed',
    },
  ];
  return (
    <section>
      <ul className="nav nav-tabs mb-3 pb-2" id="ex1" role="tablist">
        {filterBtn.map((btn)=>(
          <FilterBtn key={`btn${btn.title}`} {...btn}/>
        ))
        }
      </ul>
    </section>
  );
});

const FilterBtn = memo((props) => {
  const {title, isActive, onclick, link} = props;
  return (
    <>
      <li className="nav-item" role="presentation">
        <a
          className={`nav-link ${isActive? 'active' : ''}`}
          id="ex1-tab-1"
          href={`#/${link}`}
          onClick = {onclick}
        >
          {title}
        </a>
      </li>
    </>
  );
});

export default Navbar;
