// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AfteryoursExecutor {

    struct Plan {
        address owner;
        address beneficiary;
        uint256 amount;
        uint256 unlockTime;
        bool executed;
    }

    uint256 public planCount;
    mapping(uint256 => Plan) public plans;

    event PlanCreated(
        uint256 indexed planId,
        address indexed owner,
        address indexed beneficiary,
        uint256 amount,
        uint256 unlockTime
    );

    event PlanExecuted(uint256 indexed planId);

    function createPlan(
        address _beneficiary,
        uint256 _unlockTime
    ) external payable {

        require(msg.value > 0, "Must send ETH");
        require(_unlockTime > block.timestamp, "Invalid unlock time");

        planCount++;

        plans[planCount] = Plan({
            owner: msg.sender,
            beneficiary: _beneficiary,
            amount: msg.value,
            unlockTime: _unlockTime,
            executed: false
        });

        emit PlanCreated(
            planCount,
            msg.sender,
            _beneficiary,
            msg.value,
            _unlockTime
        );
    }

    function executePlan(uint256 _planId) external {
        Plan storage plan = plans[_planId];

        require(!plan.executed, "Already executed");
        require(block.timestamp >= plan.unlockTime, "Too early");

        plan.executed = true;

        payable(plan.beneficiary).transfer(plan.amount);

        emit PlanExecuted(_planId);
    }
}
